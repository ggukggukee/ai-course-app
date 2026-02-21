export interface EmailTemplate {
  subject: string;
  text: string;
  html?: string;
}

export function getOTPEmailTemplate(
  otp: string, 
  type: "forget-password" | "email-verification" | "sign-in"
): EmailTemplate {
  switch (type) {
    case "forget-password":
      return {
        subject: "Код для сброса пароля",
        text: `Здравствуйте!

Вы запросили сброс пароля для вашего аккаунта.

Ваш код для сброса пароля: ${otp}

Код действителен в течение 10 минут.
У вас есть 3 попытки для ввода кода.

Если вы не запрашивали сброс пароля, проигнорируйте это письмо.
Ваш пароль останется без изменений.

С уважением,
Команда Altan School`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Сброс пароля</h2>
            
            <p>Здравствуйте!</p>
            
            <p>Вы запросили сброс пароля для вашего аккаунта.</p>
            
            <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">Ваш код для сброса пароля:</p>
              <p style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 4px; margin: 10px 0;">${otp}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              • Код действителен в течение <strong>10 минут</strong><br>
              • У вас есть <strong>3 попытки</strong> для ввода кода
            </p>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Важно:</strong> Если вы не запрашивали сброс пароля, проигнорируйте это письмо. Ваш пароль останется без изменений.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px; text-align: center;">
              С уважением,<br>
              Команда Altan School
            </p>
          </div>
        `
      };

    case "email-verification":
      return {
        subject: "Подтверждение email адреса",
        text: `Здравствуйте!

Для завершения регистрации необходимо подтвердить ваш email адрес.

Ваш код подтверждения: ${otp}

Код действителен в течение 10 минут.

Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.

С уважением,
Команда Altan School`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Подтверждение email</h2>
            
            <p>Здравствуйте!</p>
            
            <p>Для завершения регистрации необходимо подтвердить ваш email адрес.</p>
            
            <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">Ваш код подтверждения:</p>
              <p style="font-size: 32px; font-weight: bold; color: #28a745; letter-spacing: 4px; margin: 10px 0;">${otp}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Код действителен в течение <strong>10 минут</strong>
            </p>
            
            <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 4px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #0c5460; font-size: 14px;">
                Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px; text-align: center;">
              С уважением,<br>
              Команда Altan School
            </p>
          </div>
        `
      };

    case "sign-in":
      return {
        subject: "Код для входа в аккаунт",
        text: `Здравствуйте!

Кто-то пытается войти в ваш аккаунт.

Ваш код для входа: ${otp}

Код действителен в течение 10 минут.

Если это были не вы, проигнорируйте это письмо и смените пароль.

С уважением,
Команда Altan School`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Вход в аккаунт</h2>
            
            <p>Здравствуйте!</p>
            
            <p>Кто-то пытается войти в ваш аккаунт.</p>
            
            <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">Ваш код для входа:</p>
              <p style="font-size: 32px; font-weight: bold; color: #6f42c1; letter-spacing: 4px; margin: 10px 0;">${otp}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Код действителен в течение <strong>10 минут</strong>
            </p>
            
            <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #721c24; font-size: 14px;">
                <strong>Безопасность:</strong> Если это были не вы, проигнорируйте это письмо и смените пароль в вашем аккаунте.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px; text-align: center;">
              С уважением,<br>
              Команда Altan School
            </p>
          </div>
        `
      };

    default:
      throw new Error(`Unknown OTP type: ${type}`);
  }
}