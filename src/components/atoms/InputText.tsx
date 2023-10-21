import { FC } from 'react';
import {TextInput as Input} from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as S from './InputText.css';

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
          <Input
            secureTextEntry={secureTextEntry}
            // status={errors[name] ? 'danger' : ''}
            placeholder={t(`form.${name}Placeholder`)}
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
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