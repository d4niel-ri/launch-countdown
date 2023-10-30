import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import CardTimer from "../../components/CardTimer/CardTimer";

const Countdown = () => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [launch, setLaunch] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let countdownDate;
    if (location.search.includes("?date=")) {
      let startIndex = location.search.indexOf("date") + 5;
      countdownDate = new Date(location.search.slice(startIndex)).getTime();
    } else {
      countdownDate = new Date("2024-04-17 17:00:00").getTime();
    }

    const countdowner = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();

      if (now > countdownDate) {
        setLaunch(true);
        return;
      }

      // Find the distance between now and the count down date
      let distance = countdownDate - now;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(convertNumberToStringTime(days));
      setHours(convertNumberToStringTime(hours));
      setMinutes(convertNumberToStringTime(minutes));
      setSeconds(convertNumberToStringTime(seconds));      

    }, 1000);
    return () => clearInterval(countdowner);
  }, [location, launch])

  return (
    <main>
      <section className={styles.container}>
        {!launch ? (<>
          <h1>We&rsquo;re launching soon</h1>

          <div className={styles.timer_box}>
            <div className={styles.one_timer}>
              <CardTimer value={days} />
              <div>DAYS</div>
            </div>
            <div className={styles.one_timer}>
              <CardTimer value={hours} />
              <div>HOURS</div>
            </div>
            <div className={styles.one_timer}>
              <CardTimer value={minutes} />
              <div>MINUTES</div>
            </div>
            <div className={styles.one_timer}>
              <CardTimer value={seconds} />
              <div>SECONDS</div>
            </div>
          </div>
        </>): (<>
          We&rsquo;re launching
        </>)}
      </section>
      <section className={styles.footer}>
        <div className={styles.app_images}>
          <a className={styles.app_image}>
            <img src="/icon-facebook.svg" alt="Facebook" />
          </a>
          <a className={styles.app_image}>
            <img src="/icon-pinterest.svg" alt="Pinterest" />
          </a>
          <a className={styles.app_image}>
            <img src="/icon-instagram.svg" alt="Instagram" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Countdown;

const convertNumberToStringTime = (value) => {
  return value.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}