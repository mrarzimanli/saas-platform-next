"use client";
import Image from "next/image";
import styles from "../shared/styles/page.module.scss";

import { Form, FormBody, FormFooter, FormHeader } from "@/shared/ui/Form";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { PasswordTrigger } from "@/shared/ui/PasswordTrigger";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

import { TriangleIconFilled } from "@/resources/icons";
import { Logo } from "@/resources/images";
import { AppRoutes } from "@/shared/types/enums";
import { IAlertData, Plan } from "@/shared/types";
import { useRegister } from "../api/register/mutation";
import { Dropdown } from "@/shared/ui/Dropdown";
import { useListPlans } from "../api/plans/queries";

interface Field {
  error: string;
  value: string;
}

interface FormData {
  username: Field;
  email: Field;
  password: Field;
  passwordConfirm: Field;
  plan: Field;
}

const defaultFormData: FormData = {
  username: { error: "", value: "" },
  email: { error: "", value: "" },
  password: { error: "", value: "" },
  passwordConfirm: { error: "", value: "" },
  plan: { error: "", value: "" },
};

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function SignupPageView() {
  const tSignUp = useTranslations("signUp");
  const tButtons = useTranslations("buttons");
  const tInputs = useTranslations("inputs");
  const tModals = useTranslations("modals");

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { mutate: mutateRegister, isLoading: isRegisterLoading } = useRegister();
  const { data: plans, isLoading: isPlansLoading } = useListPlans();

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], value, error: "" },
    }));
  };

  const validateFormFields = () => {
    if (!formData.username.value.trim()) {
      setFormData((prevData) => ({ ...prevData, username: { ...prevData.username, error: tInputs("username.error") } }));
    }
    if (!formData.email.value.trim()) {
      setFormData((prevData) => ({ ...prevData, email: { ...prevData.email, error: tInputs("email.error") } }));
    }
    if (!formData.password.value.trim()) {
      setFormData((prevData) => ({ ...prevData, password: { ...prevData.password, error: tInputs("password.error") } }));
    }
    if (!formData.passwordConfirm.value.trim()) {
      setFormData((prevData) => ({ ...prevData, passwordConfirm: { ...prevData.passwordConfirm, error: tInputs("passwordConfirm.error") } }));
    }
    if (formData.password.value.trim() !== formData.passwordConfirm.value.trim()) {
      setFormData((prevData) => ({ ...prevData, passwordConfirm: { ...prevData.passwordConfirm, error: tInputs("passwordConfirm.matchError") } }));
    }
    if (!formData.plan.value.trim()) {
      setFormData((prevData) => ({ ...prevData, plan: { ...prevData.plan, error: tInputs("plan.error") } }));
    }
    return formData.username.value && formData.email.value && formData.password.value && formData.passwordConfirm.value && formData.plan.value && formData.password.value.trim() === formData.passwordConfirm.value.trim();
  };

  const handleLogin = () => {
    if (!validateFormFields()) {
      return;
    }

    mutateRegister(
      {
        username: formData?.username?.value,
        email: formData?.email?.value,
        password: formData?.password?.value,
        passwordConfirm: formData?.passwordConfirm?.value,
        plan: formData?.plan?.value,
      },
      {
        onSuccess: async (res) => {
          router.push(AppRoutes.DASHBOARD);
        },
        onError: (e) => {
          setAlertData({ type: "danger", icon: <TriangleIconFilled />, title: tModals("unexpectedError.title"), description: tModals("unexpectedError.description") });
          setShowAlertModal(true);
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className={styles.page__content}>
      <Form>
        <FormHeader
          icon={
            <Image
              src={Logo}
              alt="Saas Platform"
              height={40}
              width={188}
              priority={true}
            />
          }
          title={tSignUp("form.title")}
          desc={tSignUp("form.desc")}
        />
        <FormBody>
          <Input
            name="username"
            label={tInputs("username.label")}
            placeholder={tInputs("username.placeholder")}
            required={true}
            error={formData?.username?.error}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange("username", e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="email"
            type="email"
            label={tInputs("email.label")}
            placeholder={tInputs("email.placeholder")}
            required={true}
            error={formData?.email?.error}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange("email", e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            label={tInputs("password.label")}
            placeholder={tInputs("password.placeholder")}
            suffix={
              <PasswordTrigger
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            }
            required={true}
            error={formData?.password?.error}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange("password", e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            name="passwordConfirm"
            type={showPassword ? "text" : "password"}
            label={tInputs("passwordConfirm.label")}
            placeholder={tInputs("passwordConfirm.placeholder")}
            suffix={
              <PasswordTrigger
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            }
            required={true}
            error={formData?.passwordConfirm?.error}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange("passwordConfirm", e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Dropdown
            name="plan"
            label={tInputs("plan.label")}
            placeholder={tInputs("plan.placeholder")}
            position="top"
            data={plans?.map((plan: Plan) => ({ id: plan.id, text: plan.name }))}
            defaultValue={plans?.find((plan: Plan) => plan.id == formData.plan.value)}
            onSelect={(id) => handleInputChange("plan", `${id}`)}
            error={formData?.plan?.error}
            required
          />
        </FormBody>
        <FormFooter>
          <Button
            designType="text"
            as="link"
            href={AppRoutes.LOGIN}
          >
            {tButtons("login")}
          </Button>
          <Button
            onClick={handleLogin}
            disabled={isRegisterLoading || isPlansLoading}
          >
            {tButtons("signUp")}
          </Button>
        </FormFooter>
      </Form>

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
    </div>
  );
}
