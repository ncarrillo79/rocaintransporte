import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { CONFIG, cheapAddOns } from '../lib/catalog';
import { round2, usd } from '../lib/format';
import { Glyph } from './ui';
import styles from './Cart.module.css';

// ---------------------------------------------------------------------------
// Estado del carrito: reducer + Context + persistencia en localStorage.
// ---------------------------------------------------------------------------

export interface CartAddon {
  id: string;
  label: string;
  price: number;
}

export interface CartLine {
  lineId: string;
  kind: 'product' | 'kit' | 'reservation' | 'addon';
  refId: string;
  title: string;
  unitPrice: number;
  qty: number;
  options?: Record<string, string>;
  addons?: CartAddon[];
  note?: string;
}

export type AddInput = Omit<CartLine, 'lineId' | 'qty'> & { qty?: number };

interface CartState {
  lines: CartLine[];
}

type Action =
  | { type: 'add'; line: AddInput }
  | { type: 'setQty'; lineId: string; qty: number }
  | { type: 'remove'; lineId: string }
  | { type: 'clear' };

const STORAGE_KEY = 'tienda-puente:cart:v1';

const makeLineId = () => Math.random().toString(36).slice(2, 10);

function sameLine(a: CartLine, b: AddInput): boolean {
  return (
    a.kind === b.kind &&
    a.refId === b.refId &&
    JSON.stringify(a.options ?? {}) === JSON.stringify(b.options ?? {}) &&
    JSON.stringify(a.addons ?? []) === JSON.stringify(b.addons ?? [])
  );
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const qty = action.line.qty ?? 1;
      const existing = state.lines.find((l) => sameLine(l, action.line));
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.lineId === existing.lineId ? { ...l, qty: l.qty + qty } : l,
          ),
        };
      }
      const { qty: _omit, ...rest } = action.line;
      return { lines: [...state.lines, { ...rest, lineId: makeLineId(), qty }] };
    }
    case 'setQty':
      return {
        lines: state.lines
          .map((l) => (l.lineId === action.lineId ? { ...l, qty: action.qty } : l))
          .filter((l) => l.qty > 0),
      };
    case 'remove':
      return { lines: state.lines.filter((l) => l.lineId !== action.lineId) };
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
}

export function lineTotal(l: CartLine): number {
  const addons = (l.addons ?? []).reduce((s, a) => s + a.price, 0);
  return round2((l.unitPrice + addons) * l.qty);
}

function loadInitial(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartState;
      if (parsed && Array.isArray(parsed.lines)) return parsed;
    }
  } catch {
    /* almacenamiento no disponible (modo privado, cuota, etc.) */
  }
  return { lines: [] };
}

interface CartContextValue {
  lines: CartLine[];
  subtotal: number;
  count: number;
  add: (line: AddInput) => void;
  setQty: (lineId: string, qty: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadInitial());
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignora cuota / modo privado */
    }
  }, [state]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = round2(state.lines.reduce((s, l) => s + lineTotal(l), 0));
    const count = state.lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines: state.lines,
      subtotal,
      count,
      add: (line) => {
        dispatch({ type: 'add', line });
        setOpen(true);
      },
      setQty: (lineId, qty) => dispatch({ type: 'setQty', lineId, qty }),
      remove: (lineId) => dispatch({ type: 'remove', lineId }),
      clear: () => dispatch({ type: 'clear' }),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  }, [state, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}

// ---------------------------------------------------------------------------
// Barra de envio gratis: vive dentro del carrito y empuja el ultimo add-on.
// ---------------------------------------------------------------------------

export function FreeShippingBar() {
  const { subtotal, lines } = useCart();
  const threshold = CONFIG.freeShippingThreshold;
  const remaining = round2(Math.max(0, threshold - subtotal));
  const pct = threshold > 0 ? Math.min(100, (subtotal / threshold) * 100) : 100;
  const reached = subtotal > 0 && remaining <= 0;
  const suggestions = cheapAddOns(
    lines.map((l) => l.refId),
    3,
  );

  return (
    <div className={styles.ship}>
      <p className={styles.shipMsg}>
        {subtotal === 0
          ? `Envio nacional gratis desde ${usd(threshold)}`
          : reached
            ? 'Listo: tu pedido tiene envio nacional gratis'
            : `Te faltan ${usd(remaining)} para el envio nacional gratis`}
      </p>
      <div
        className={styles.shipTrack}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className={styles.shipFill} style={{ width: `${pct}%` }} />
      </div>
      {!reached && suggestions.length > 0 && (
        <p className={styles.shipSugg}>
          Suma un detalle: {suggestions.map((s) => s.shortName).join(' - ')}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cajon del carrito. Se abre solo al agregar algo (hace de "toast").
// ---------------------------------------------------------------------------

export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQty, remove } = useCart();

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        aria-hidden={!isOpen}
      >
        <header className={styles.drawerHead}>
          <h2>Tu carrito</h2>
          <button className={styles.iconBtn} onClick={close} aria-label="Cerrar carrito">
            X
          </button>
        </header>

        <div className={styles.drawerBody}>
          {lines.length === 0 ? (
            <p className={styles.empty}>Todavia no has agregado nada.</p>
          ) : (
            <ul className={styles.lineList}>
              {lines.map((l) => (
                <li key={l.lineId} className={styles.line}>
                  <span className={styles.lineThumb}>
                    <Glyph name="caja" />
                  </span>
                  <div className={styles.lineMain}>
                    <p className={styles.lineTitle}>{l.title}</p>
                    {l.options && Object.keys(l.options).length > 0 && (
                      <p className={styles.lineMeta}>
                        {Object.entries(l.options)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' - ')}
                      </p>
                    )}
                    {l.addons?.map((a) => (
                      <p key={a.id} className={styles.lineMeta}>
                        + {a.label} ({usd(a.price)})
                      </p>
                    ))}
                    {l.note && <p className={styles.lineNote}>{l.note}</p>}
                    <div className={styles.qtyRow}>
                      <button
                        className={styles.step}
                        onClick={() => setQty(l.lineId, l.qty - 1)}
                        aria-label="Quitar uno"
                      >
                        -
                      </button>
                      <span>{l.qty}</span>
                      <button
                        className={styles.step}
                        onClick={() => setQty(l.lineId, l.qty + 1)}
                        aria-label="Agregar uno"
                      >
                        +
                      </button>
                      <button className={styles.removeBtn} onClick={() => remove(l.lineId)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <span className={styles.linePrice}>{usd(lineTotal(l))}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className={styles.drawerFoot}>
          <FreeShippingBar />
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <span>{usd(subtotal)}</span>
          </div>
          <button className={styles.checkout} disabled={lines.length === 0}>
            Ir a pagar
          </button>
          <p className={styles.footNote}>
            El pago se verifica antes de despachar. Metodos: Pago Movil, transferencia, Zelle,
            Binance/USDT.
          </p>
        </footer>
      </aside>
    </>
  );
}
