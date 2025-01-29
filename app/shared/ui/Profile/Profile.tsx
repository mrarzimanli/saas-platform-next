"use client";
import React, { useRef, useState } from "react";
import styles from "./Profile.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import useOutsideClick from "@/shared/hooks/useOutsideClick";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { getInitials } from "@/shared/utils/getInitials";
import { AppRoutes } from "@/shared/types/enums";
import { LogoutIcon, SettingsIcon } from "@/resources/icons";
import { useAuth } from "@/providers/AuthProvider";

const Profile = () => {
  const tButtons = useTranslations("buttons");
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const { auth, handleLogout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);

  useOutsideClick({
    ref: profileDropdownRef,
    handler: () => setShowProfile(false),
  });

  return (
    <>
      <div
        className={classNames(styles.profile, showProfile && styles.active)}
        ref={profileDropdownRef}
      >
        <UserAvatar
          id="btnShowProfile"
          thumb={auth?.user?.photoImg}
          label={auth?.user?.username}
          type="tertiary"
          onClick={() => setShowProfile((p) => !p)}
        />

        <div className={styles.profile__body}>
          <div className={styles.user}>
            <div className={styles.user__picture}>
              {auth?.user?.photoImg ? (
                <img
                  src={`data:image/png;base64,${auth?.user.photoImg}`}
                  alt="Image"
                />
              ) : (
                getInitials(`${auth?.user?.username}`)
              )}
            </div>
            <div className={styles.user__details}>
              <span className={styles.user__name}>{auth?.user?.username}</span>
              <span className={styles.user__email}>{auth?.user?.email}</span>
            </div>
          </div>
          <div className={styles.profile__actions}>
            <Link
              className={styles.profile__actions__item}
              href={AppRoutes.SETTINGS}
            >
              <SettingsIcon />
              <span>Settings</span>
            </Link>
            <button
              className={classNames(styles.profile__actions__item, styles.logout)}
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>{tButtons("logout")}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
