import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CheckBox } from '@rneui/themed';

import * as S from './Inputs.css';

interface CheckboxFieldProps {
  name: string;
  required?: boolean;
  desc?: boolean;
}

const CheckboxField: FC<CheckboxFieldProps> = ({ name, required, desc }) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <S.FieldContainer small>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <S.CheckBoxWrapper>
            <CheckBox
              checked={value}
              onPress={() => onChange(!value)}
              containerStyle={{ backgroundColor: 'transparent', padding: 0, margin: 0 }}
            />
            <S.FormLabel style={{ fontFamily: 'JosefinSans_700Bold' }} noMargin>
              {t(`form.${name}Label`)}
            </S.FormLabel>
          </S.CheckBoxWrapper>
        )}
        rules={{
          required: {
            value: true,
            message: t('form.require'),
          },
        }}
      />
      {desc && <S.Desc>{t(`form.${name}Desc`)}</S.Desc>}
    </S.FieldContainer>
  );
};

export default CheckboxField;
