import type { SiteContent } from "@/content/types";
import { BackToTop } from "./BackToTop";
import { FitText } from "./FitText";
import { Reveal } from "./Reveal";
import styles from "./Contact.module.css";

type Props = {
  contact: SiteContent["contact"];
  footer: SiteContent["footer"];
  name: string;
};

export function Contact({ contact, footer, name }: Props) {
  return (
    <footer id="contato" className={styles.root} data-theme="dark">
      <div className={styles.call}>
        <h2 className="label">{contact.label}</h2>
        <Reveal>
          <p className={styles.headline}>{contact.headline}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a href={contact.cta.href} className={styles.button}>
            <span>{contact.cta.label}</span>
            <span className={styles.buttonArrow} aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>
      </div>

      <div className={styles.channels}>
        {contact.channels.map((channel) => (
          <div key={channel.label} className={styles.channel}>
            <h3 className={`label ${styles.channelLabel}`}>{channel.label}</h3>
            <ul className={styles.channelItems}>
              {channel.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={styles.channelLink}
                      {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className={styles.name} aria-hidden="true">
        <FitText className={styles.fit} fallback="12.4vw">
          {name}
        </FitText>
      </p>

      <div className={styles.bar}>
        <p className={styles.muted}>{footer.copyright}</p>
        <p className={`${styles.muted} ${styles.tagline}`}>{footer.tagline}</p>
        <BackToTop label={footer.backToTop} />
      </div>
    </footer>
  );
}
