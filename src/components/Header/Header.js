"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import Cookies from "js-cookie";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function Header({ theme, className, ...delegated }) {
  const [statusTheme, setStatusTheme] = React.useState(theme);

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button
          className={styles.action}
          onClick={() => {
            const newTheme = statusTheme === "light" ? "dark" : "light";

            setStatusTheme(newTheme);
            Cookies.set("theme", newTheme, {
              expires: 365,
            });

            const tokens = newTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

            document.documentElement.setAttribute("data-color-theme", newTheme);
            Object.entries(tokens).forEach(([key, value]) => {
              document.documentElement.style.setProperty(key, value);
            });
          }}
        >
          {statusTheme === "light" ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
