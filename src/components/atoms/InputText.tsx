import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as S from './Inputs.css';
import { generateBoxShadowStyle } from '../../helpers/generateBoxShadowStyle';
import { Platform } from 'react-native';
import ErrorText from './ErrorText';

interface InputFieldProps {
  name: string;
  required?: boolean;
  desc?: boolean;
  type?: string;
  noLabel?: boolean;
  light?: boolean;
  secureTextEntry?: boolean;
  placeholder?: string;
  small?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  name,
  required,
  desc,
  noLabel,
  light,
  secureTextEntry,
  placeholder,
  small,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <S.FieldContainer small={small}>
      {!noLabel && (
        <S.FormLabel light={light} style={{ fontFamily: 'JosefinSans_700Bold' }}>
          {t(`form.${name}Label`)}
        </S.FormLabel>
      )}
      {desc && <S.Desc light={light}>{t(`form.${name}Desc`)}</S.Desc>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <S.StyledInput
            secureTextEntry={secureTextEntry}
            status={errors[name] ? 'danger' : ''}
            placeholder={placeholder || t(`form.${name}Placeholder`)}
            value={value}
            onBlur={onBlur}
            onChangeText={(value: string) => onChange(value)}
            style={{ ...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
          />
        )}
        rules={{
          required: {
            value: true,
            message: t('form.require'),
          },
        }}
      />

      {errors?.[name] && <ErrorText>{errors?.[name]?.message as string}</ErrorText>}
    </S.FieldContainer>
  );
};

export default InputField;
