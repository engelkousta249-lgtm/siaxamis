"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, animate, motion, useInView, useMotionValue,
  useScroll, useSpring, useTransform,
} from "framer-motion";
import Car from "./Car";

const PHONE = "27510 29105";
const MOBILE = "6937 413 272";

const services = [
  ["🔧", "Επιδιόρθωση αμαξώματος", "Από μικροφθορές της καθημερινής χρήσης μέχρι πλήρη ανακατασκευή μετά από ατύχημα."],
  ["🎨", "Βαφή & αναζωογόνηση χρώματος", "Το χρώμα του αυτοκινήτου σας σαν καινούργιο."],
  ["📄", "Διεκπεραίωση ζημιάς", "Αναλαμβάνουμε την επικοινωνία με την ασφαλιστική σας εταιρεία."],
  ["🔍", "Πραγματογνωμοσύνη", "Διενεργείται στον χώρο μας, υπό την επίβλεψη στελέχους μας."],
  ["🛡️", "Εγγύηση επισκευής", "Άρτια και ασφαλής επισκευή του οχήματός σας."],
  ["⚡", "Ταχύτητα · Ποιότητα · Οικονομία", "Το τρίπτυχο της επιτυχίας μας, χωρίς άγχος και πολύπλοκες διαδικασίες."],
];
const glass = ["Εύκολη πρόσβαση", "Γρήγορα & καθαρά", "Εμπειρία & Γνήσια Ανταλλακτικά", "Φροντίδα για τα πάντα", "Η ασφάλειά σας είναι η προτεραιότητά μας"];
const film = ["Άνεση", "Μεμβράνες & Ιδιωτικότητα", "Ασφάλεια & Προστασία", "Βελτίωση & Αισθητική", "Προστασία παιδιών"];
const colors = ["#e11d1d", "#2563eb", "#e4e4e7", "#27272a", "#16a34a", "#eab308", "#f97316", "#a855f7"];
const marquee = ["CAR-O-LINER", "3M", "GLASSDRIVE", "ΦΑΝΟΠΟΙΙΑ", "ΒΑΦΗ", "ΜΕΜΒΡΑΝΕΣ", "ΚΡΥΣΤΑΛΛΑ"];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

function Tilt({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800, height: "100%" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export default function Site() {
  const { scrollY, scrollYProgress } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const fade = useTransform(scrollY, [0, 450], [1, 0]);
  const carX = useTransform(useSpring(scrollYProgress, { stiffness: 80, damping: 20 }), [0, 1], ["0%", "90%"]);
  const [loading, setLoading] = useState(true);
  const [paint, setPaint] = useState(colors[0]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <div className="loader-logo">ΣΙΑΧΑΜΗΣ</div>
            <div className="loader-road"><div className="car l"><Car /></div></div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav>
        <a href="#top" className="logo">ΣΙΑΧΑΜΗΣ</a>
        <ul>
          <li><a href="#services">Υπηρεσίες</a></li>
          <li><a href="#paint">Χρώματα</a></li>
          <li><a href="#glassdrive">Glassdrive</a></li>
          <li><a href="#3m">3M</a></li>
          <li><a href="#contact">Επικοινωνία</a></li>
        </ul>
        <a className="btn small" href="tel:+302751029105">📞 Κλήση</a>
      </nav>
      <div className="track"><motion.div className="rider" style={{ left: carX }}><Car glow={false} /></motion.div></div>

      <header
        className="hero"
        id="top"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <i
            key={i}
            className="streak"
            style={{
              top: `${8 + i * 6.5}%`,
              width: `${80 + ((i * 37) % 160)}px`,
              animationDuration: `${(1.2 + ((i * 37) % 18) / 10).toFixed(2)}s`,
              animationDelay: `-${(((i * 43) % 20) / 10).toFixed(2)}s`,
            }}
          />
        ))}
        <motion.div className="wrap hero-in" style={{ y, opacity: fade }}>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: 0.2 }}>
            Φανοποιείο Αυτοκινήτων · Άργος
          </motion.p>
          <h1 aria-label="ΣΙΑΧΑΜΗΣ">
            {"ΣΙΑΧΑΜΗΣ".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -80 }}
                animate={loading ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                style={{ display: "inline-block", color: i % 2 ? undefined : "var(--red)" }}
              >
                {c}
              </motion.span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ delay: 1 }}>
            Όταν η ποιότητα παίζει πρωταρχικό ρόλο. Σχεδόν 40 χρόνια φροντίδας για το αυτοκίνητό σας.
          </motion.p>
          <motion.div className="cta" initial={{ opacity: 0, y: 20 }} animate={loading ? {} : { opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
            <a className="btn" href="tel:+302751029105">📞 {PHONE}</a>
            <a className="btn ghost" href="#paint">🎨 Διάλεξε χρώμα</a>
          </motion.div>
        </motion.div>

        <div className="road">
          <div className="car a"><Car color="#e11d1d" /></div>
          <div className="car b"><Car color="#e4e4e7" glow={false} /></div>
          <div className="car c"><Car color="#2563eb" glow={false} /></div>
        </div>
      </header>

      <div className="marquee" aria-hidden>
        <div className="mq">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => <span key={i}>{m} <b>✦</b></span>)}
        </div>
      </div>

      <section className="stats">
        <div className="wrap statgrid">
          <Reveal><div><big><Count to={40} suffix="+" /></big><small>χρόνια εμπειρίας</small></div></Reveal>
          <Reveal delay={0.1}><div><big><Count to={3} /></big><small>κορυφαίοι συνεργάτες</small></div></Reveal>
          <Reveal delay={0.2}><div><big><Count to={6} /></big><small>υπηρεσίες υπό μία στέγη</small></div></Reveal>
        </div>
      </section>

      <section className="sec" id="services">
        <div className="wrap">
          <Reveal><h2>Οι <span>υπηρεσίες</span> μας</h2></Reveal>
          <Reveal delay={0.1}><p className="sub">Με γνώμονα την καλύτερη εξυπηρέτησή σας, σε λογικές τιμές και πάντα με εγγύηση.</p></Reveal>
          <div className="grid">
            {services.map(([icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Tilt>
                  <div className="card">
                    <div className="ico">{icon}</div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt" id="paint">
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal><h2>Το χρώμα που <span>ονειρεύεστε</span></h2></Reveal>
          <Reveal delay={0.1}><p className="sub" style={{ margin: "0 auto 10px" }}>Βαφή και αναζωογόνηση χρώματος. Διάλεξε απόχρωση και δες το αυτοκίνητο να αλλάζει.</p></Reveal>
          <div className="stage">
            <motion.div key={paint} initial={{ scale: 0.96 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              <Car color={paint} />
            </motion.div>
            <div className="floor" style={{ background: `radial-gradient(ellipse at center, ${paint}66, transparent 70%)` }} />
          </div>
          <div className="swatches">
            {colors.map((c) => (
              <button
                key={c}
                aria-label={`Χρώμα ${c}`}
                onClick={() => setPaint(c)}
                className={paint === c ? "sw on" : "sw"}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="glassdrive">
        <div className="wrap split">
          <Reveal>
            <h2><span>Glassdrive</span></h2>
            <p className="sub">Οι δικοί σας ειδικοί στα κρύσταλλα αυτοκινήτων. Ζημιά σε κρύσταλλο; Επισκευάζουμε και αντικαθιστούμε παρμπρίζ, πλαϊνά και πίσω κρύσταλλα σε όλες τις μάρκες οχημάτων.</p>
          </Reveal>
          <Reveal delay={0.15}><ul className="checks">{glass.map((g) => <li key={g}>✔ {g}</li>)}</ul></Reveal>
        </div>
      </section>

      <section className="sec alt" id="3m">
        <div className="wrap split">
          <Reveal>
            <h2>Μεμβράνες <span>3M</span></h2>
            <p className="sub">Οι αντηλιακές μεμβράνες 3M κάνουν πιο έντονα τα συναισθήματα της οδήγησης: σκουραίνουν τα τζάμια και δεν επιτρέπουν στα αδιάκριτα βλέμματα να δουν τα πολύτιμα αντικείμενα που έχετε μέσα στο αυτοκίνητο.</p>
            <p className="sub"><b>Wrap your ride</b> με 3M Scotchprint Wrap Film Series 1080.</p>
          </Reveal>
          <Reveal delay={0.15}><ul className="checks">{film.map((g) => <li key={g}>✔ {g}</li>)}</ul></Reveal>
        </div>
      </section>

      <section className="sec" id="contact">
        <div className="wrap split">
          <Reveal>
            <h2><span>Επικοινωνία</span></h2>
            <p className="sub">
              ΣΙΑΧΑΜΗΣ - Φανοποιείο Αυτοκινήτων<br />
              1ο χλμ ΑΡΓΟΥΣ - ΚΑΡΥΑΣ, Τ.Κ. 21200 ΑΡΓΟΣ<br />
              Τηλ: <a href="tel:+302751029105">{PHONE}</a><br />
              Κιν: <a href="tel:+306937413272">{MOBILE}</a><br />
              Fax: 27510 26075<br />
              <a href="mailto:info@siaxamis.gr">info@siaxamis.gr</a>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <iframe
              title="Χάρτης ΣΙΑΧΑΜΗΣ"
              className="map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=%CE%A3%CE%99%CE%91%CE%A7%CE%91%CE%9C%CE%97%CE%A3+%CE%A6%CE%B1%CE%BD%CE%BF%CF%80%CE%BF%CE%B9%CE%B5%CE%AF%CE%BF+%CE%91%CF%81%CE%B3%CE%BF%CF%82&output=embed"
            />
          </Reveal>
        </div>
      </section>

      <footer>© {new Date().getFullYear()} ΣΙΑΧΑΜΗΣ - Φανοποιείο Αυτοκινήτων</footer>
      <a className="fab" href="tel:+302751029105" aria-label="Κλήση">📞</a>
    </>
  );
}
