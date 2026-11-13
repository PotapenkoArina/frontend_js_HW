import { useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../api/baseApi";

type RegisterFormValues = {
  email: string;
  password: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

type ApiError = {
  data?: unknown;
  error?: string;
  status?: number | string;
};

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;
    if (typeof apiError.data === "string") {
      return apiError.data;
    }
    if (
      typeof apiError.data === "object" &&
      apiError.data !== null &&
      "message" in apiError.data &&
      typeof apiError.data.message === "string"
    ) {
      return apiError.data.message;
    }
    if (apiError.error) {
      return apiError.error;
    }
    if (apiError.status) {
      return `Помилка сервера: ${apiError.status}`;
    }
  }

  return "Не вдалося виконати запит. Перевірте з'єднання з сервером.";
}

function RegisterForm() {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const result = await registerUser(values);

    if (result.data) {
      window.alert("Реєстрація успішна!");
    } else {
      window.alert(`Помилка реєстрації: ${getErrorMessage(result.error)}`);
    }
  };

  return (
    <div className="auth-card">
      <h2>Створити акаунт</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="auth-field">
          Електронна пошта
          <input
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Введіть електронну пошту.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введіть коректну електронну пошту.",
              },
            })}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <span className="auth-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="auth-field">
          Пароль
          <input
            type="password"
            autoComplete="new-password"
            {...register("password", {
              required: "Введіть пароль.",
              minLength: {
                value: 6,
                message: "Пароль має містити щонайменше 6 символів.",
              },
            })}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <span className="auth-error" role="alert">
              {errors.password.message}
            </span>
          )}
        </label>

        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Зачекайте..." : "Зареєструватися"}
        </button>
      </form>
    </div>
  );
}

function LoginForm() {
  const [loginUser] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const result = await loginUser(values);

    if (result.data) {
      window.alert("Авторизація успішна!");
    } else {
      window.alert(`Помилка авторизації: ${getErrorMessage(result.error)}`);
    }
  };

  return (
    <div className="auth-card">
      <h2>Увійти в акаунт</h2>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="auth-field">
          Електронна пошта
          <input
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Введіть електронну пошту.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введіть коректну електронну пошту.",
              },
            })}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <span className="auth-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="auth-field">
          Пароль
          <input
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Введіть пароль." })}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <span className="auth-error" role="alert">
              {errors.password.message}
            </span>
          )}
        </label>

        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Зачекайте..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}

export function AuthForm() {
  return (
    <section className="auth-section" aria-label="Реєстрація та авторизація">
      <RegisterForm />
      <LoginForm />
    </section>
  );
}
