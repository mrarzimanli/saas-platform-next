"use client";
import { Input } from "@/shared/ui/Input";
import styles from "../shared/styles/settings.module.scss";
import { useTranslations } from "use-intl";
import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/providers/AuthProvider";
import { AppRoutes, Plans } from "@/shared/types/enums";
import { useRouter } from "next/navigation";
import { TriangleIconFilled } from "@/resources/icons";
import { IAlertData, Plan } from "@/shared/types";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import { useCancelSubscription } from "@/(routes)/(auth)/api/plans/mutation";
import { useListPlans } from "@/(routes)/(auth)/api/plans/queries";

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function SettingsPageView() {
  const tButtons = useTranslations("buttons");
  const tInputs = useTranslations("inputs");
  const tModals = useTranslations("modals");
  const tSettings = useTranslations("settings");

  const { auth, refetchUser } = useAuth();

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);

  const { mutate: mutateCancelSubscription, isLoading: isCancelSubscriptionLoading } = useCancelSubscription();
  const { data: plans, isLoading: isPlansLoading } = useListPlans();

  const user = auth?.user;
  const subscription = user?.subscription;
  const plan = plans?.find((p: Plan) => p.id === subscription?.planId);

  const confirmCancelSubscription = () => {
    if (!auth?.user?.id) return;

    mutateCancelSubscription(
      {
        userId: auth?.user?.id,
      },
      {
        onSuccess: async () => {
          refetchUser();
          setShowCancelSubscription(false);
          setAlertData({ type: "success", icon: <TriangleIconFilled />, title: tModals("successfulOperation.title"), description: tModals("successfulOperation.description") });
          setShowAlertModal(true);
        },
        onError: () => {
          setAlertData({ type: "danger", icon: <TriangleIconFilled />, title: tModals("unexpectedError.title"), description: tModals("unexpectedError.description") });
          setShowAlertModal(true);
        },
      }
    );
  };

  const handleCancelSubscription = () => {
    setShowCancelSubscription((prev) => !prev);
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.section}>
          <div className={styles.section__header}>
            <div className={styles.section__header__content}>
              <span className={styles.section__header__title}>{tSettings("accountInfo.title")}</span>
              <p className={styles.section__header__desc}>{tSettings("accountInfo.description")}</p>
            </div>
          </div>
          <div className={styles.section__body}>
            <div className={styles.accountInfo}>
              <Input
                name="username"
                label={tInputs("username.label")}
                placeholder={tInputs("username.placeholder")}
                readOnly={true}
                value={user?.username || ""}
              />
              <Input
                name="email"
                label={tInputs("email.label")}
                placeholder={tInputs("email.placeholder")}
                readOnly={true}
                value={user?.email || ""}
              />
              <Input
                name="firstDayOfWeek"
                label={tInputs("firstDayOfWeek.label")}
                placeholder={tInputs("firstDayOfWeek.placeholder")}
                readOnly={true}
                value={"Monday"}
              />
              <Input
                name="timezone"
                label={tInputs("timezone.label")}
                placeholder={tInputs("timezone.placeholder")}
                readOnly={true}
                value={"Asia/Baku"}
              />
              <Input
                name="timeFormat"
                label={tInputs("timeFormat.label")}
                placeholder={tInputs("timeFormat.placeholder")}
                readOnly={true}
                value={"12-hour"}
              />
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.section__header}>
            <div className={styles.section__header__content}>
              <span className={styles.section__header__title}>{tSettings("billingInfo.title")}</span>
              <p className={styles.section__header__desc}>{tSettings("billingInfo.description")}</p>
            </div>
          </div>
          <div className={styles.section__body}>
            <div className={styles.billingInfo}>
              <div className={styles.billingCard}>
                <div className={styles.billingCard__header}>
                  <span className={styles.billingCard__header__title}>{subscription?.planId}</span>
                  <span className={styles.billingCard__header__desc}>Current plan</span>
                </div>
                <div className={styles.billingCard__body}>
                  <div>
                    <span>Next billing amount: </span>
                    <strong>${plan?.price}</strong>
                  </div>
                  <div>
                    <span>
                      Next billing date: <strong>September 9, 2999</strong>
                    </span>
                  </div>
                  <div>
                    <span>
                      Payment method : <strong>Master Card</strong>
                    </span>
                  </div>
                </div>
                <div className={styles.billingCard__footer}>
                  <Button
                    color="gray"
                    size="sm"
                    onClick={handleCancelSubscription}
                    disabled={subscription?.planId === Plans.BASIC || subscription?.status === "canceled"}
                  >
                    {tButtons("cancel")}
                  </Button>
                  <Button
                    size="sm"
                    disabled={subscription?.planId === Plans.ENTERPRISE}
                  >
                    {tButtons("upgrade")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showCancelSubscription}
        onClose={() => setShowCancelSubscription((prev) => !prev)}
        animation="translate"
        color="danger"
        size="sm"
        center={true}
      >
        <ModalHeader
          icon={<TriangleIconFilled />}
          title={tModals("cancelPlan.title")}
          desc={tModals("cancelPlan.description")}
          onClose={() => setShowCancelSubscription((prev) => !prev)}
        />
        <ModalFooter
          buttons={
            <>
              <Button
                onClick={() => setShowCancelSubscription((prev) => !prev)}
                designType="secondary"
              >
                {tButtons("no")}
              </Button>
              <Button
                onClick={confirmCancelSubscription}
                disabled={isCancelSubscriptionLoading}
              >
                {tButtons("yes")}
              </Button>
            </>
          }
        />
      </Modal>
      <Modal
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal((p) => !p)}
        animation="translate"
        color={alertData.type}
        size="sm"
        center={true}
      >
        <ModalHeader
          icon={alertData.icon}
          title={alertData.title}
          desc={alertData.description}
          onClose={() => setShowAlertModal((p) => !p)}
        />
        <ModalFooter
          buttons={
            <>
              <Button onClick={() => setShowAlertModal((p) => !p)}>{tButtons("okay")}</Button>
              <Button
                color="gray"
                onClick={() => setShowAlertModal((p) => !p)}
              >
                {tButtons("close")}
              </Button>
            </>
          }
        />
      </Modal>
    </>
  );
}
