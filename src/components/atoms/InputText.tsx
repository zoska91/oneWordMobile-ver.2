import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as S from './InputText.css';
import { generateBoxShadowStyle } from '../../helpers/generateBoxShadowStyle';
import { Platform, StyleSheet } from 'react-native';

interface InputFieldProps {
  name: string;
  required?: boolean;
  desc?: boolean;
  type?: string;
  noLabel?: boolean;
  defaultValue?: string;
  light?: boolean;
  secureTextEntry?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  name,
  required,
  desc,
  type = 'text',
  noLabel,
  defaultValue,
  light,
  secureTextEntry,
  ...props
}) => {
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <S.FieldContainer>
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
            placeholder={t(`form.${name}Placeholder`)}
            value={value}
            onBlur={onBlur}
            onChangeText={(value: string) => onChange(value)}
            style={{...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
          />
        )}
        rules={{
          required: {
            value: true,
            message: t('form.require'),
          },
        }}
      />

      {/* {errors?.[name] && <S.ErrorText>{errors?.[name]?.message}</S.ErrorText>} */}
    </S.FieldContainer>
  );
};

export default InputField;