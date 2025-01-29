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
import { useLogin } from "../api/login/mutation";
import { AppRoutes } from "@/shared/types/enums";
import { IAlertData } from "@/shared/types";
import { ErrorResponse } from "@/shared/types/api";

interface Field {
  error: string;
  value: string;
}

interface FormData {
  email: Field;
  password: Field;
}

const defaultFormData: FormData = {
  email: { error: "", value: "" },
  password: { error: "", value: "" },
};

const defaultAlertData: IAlertData = { type: "default", icon: <TriangleIconFilled />, title: "", description: "" };

export default function LoginPageView() {
  const tLogin = useTranslations("login");
  const tButtons = useTranslations("buttons");
  const tInputs = useTranslations("inputs");
  const tModals = useTranslations("modals");

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertData, setAlertData] = useState<IAlertData>(defaultAlertData);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { mutate: mutateLogin, isLoading: isLoginLoading } = useLogin();

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], value, error: "" },
    }));
  };

  const validateFormFields = () => {
    if (!formData.email.value.trim()) {
      setFormData((prevData) => ({ ...prevData, email: { ...prevData.email, error: tInputs("email.error") } }));
    }
    if (!formData.password.value.trim()) {
      setFormData((prevData) => ({ ...prevData, password: { ...prevData.password, error: tInputs("password.error") } }));
    }
    return formData.email.value && formData.password.value;
  };

  const handleLogin = () => {
    if (!validateFormFields()) {
      return;
    }

    mutateLogin(
      {
        email: formData?.email?.value,
        password: formData?.password?.value,
      },
      {
        onSuccess: async (res) => {
          router.push(AppRoutes.DASHBOARD);
        },
        onError: (e: ErrorResponse) => {
          setAlertData({
            type: "danger",
            icon: <TriangleIconFilled />,
            title: tModals("unexpectedError.title"),
            description: e?.message,
          });
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
          title={tLogin("form.title")}
          desc={tLogin("form.desc")}
        />
        <FormBody>
          <Input
            name="email"
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
        </FormBody>
        <FormFooter>
          <Button
            designType="text"
            as="link"
            href={AppRoutes.SIGNUP}
          >
            {tButtons("signUp")}
          </Button>
          <Button
            onClick={handleLogin}
            disabled={isLoginLoading}
          >
            {tButtons("login")}
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
