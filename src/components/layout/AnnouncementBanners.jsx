import { useState } from "react";
import { X, Github, AlertTriangle, Info } from "lucide-react";

const AnnouncementBanner = ({ type = "info", children, storageKey }) => {
  const [dismissed, setDismissed] = useState(() => {
    if (storageKey) {
      return localStorage.getItem(`banner-${storageKey}`) === "true";
    }
    return false;
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (storageKey) {
      localStorage.setItem(`banner-${storageKey}`, "true");
    }
  };

  const styles = {
    info: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    warning:
      "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
  };

  const icons = {
    info: <Info className="h-4 w-4 shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 shrink-0" />,
  };

  return (
    <div
      className={`border-b px-4 py-2.5 text-sm ${styles[type]}`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icons[type]}
          <span className="truncate">{children}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const AnnouncementBanners = () => {
  return (
    <div className="mt-[5.5rem]">
      <AnnouncementBanner type="info" storageKey="open-source">
        <span className="font-medium">Open Source!</span> DevConnect is open
        source. If you find it useful, give us a star on GitHub — it helps us
        grow and improve!{" "}
        <a
          href="https://github.com/mortada335/find-developer"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2 hover:opacity-80"
        >
          Star on GitHub →
        </a>
      </AnnouncementBanner>
      <AnnouncementBanner type="warning" storageKey="email-check">
        <span className="font-medium">Important:</span> After registering as a
        developer, please check the email address you registered with. We will
        send important updates and login credentials to that email.
      </AnnouncementBanner>
    </div>
  );
};

export default AnnouncementBanners;
