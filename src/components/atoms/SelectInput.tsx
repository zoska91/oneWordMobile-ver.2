import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as S from './Inputs.css';
import { Picker } from '@react-native-picker/picker';
import { Text, Platform } from 'react-native';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import Button from './Button';
import Popup from '../Popup/Popup';
import { generateBoxShadowStyle } from '../../helpers/generateBoxShadowStyle';
import ErrorText from './ErrorText';

export const TouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 50px;
`;

interface SelectFieldProps {
  name: string;
  desc?: boolean;
  options: { value: string | number; label: string }[];
  noLabel?: boolean;
  placeholderText?: string;
  small?: boolean;
  required?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  desc,
  options,
  noLabel,
  placeholderText,
  small,
  required,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    formState: { errors },
    getValues,
    control,
  } = useFormContext();

  const { t } = useTranslation();
  const value = getValues(name);

  return (
    <S.FieldContainer small={small}>
      {!noLabel && (
        <S.FormLabel style={{ fontFamily: 'JosefinSans_700Bold' }}>
          {t(`form.${name}Label`)}
        </S.FormLabel>
      )}
      {desc && <S.Desc>{t(`form.${name}Desc`)}</S.Desc>}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ height: 0 }}>
        <S.SelectValue
          style={{ ...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
        >
          <Text>
            {options?.filter((el) => el.value === value)[0]?.label ||
              placeholderText ||
              t(`form.${name}Placeholder`)}
          </Text>
        </S.SelectValue>
      </TouchableOpacity>

      {errors?.[name] && <ErrorText>{errors?.[name]?.message as string}</ErrorText>}

      <Popup modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <S.CloseButton onPress={() => setModalVisible(false)}>
          <AntDesign name='closecircle' size={32} color='#2e2757' />
        </S.CloseButton>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue: string) => onChange(itemValue)}
              style={{ marginBottom: 30 }}
            >
              {options.map((el, i) => (
                <Picker.Item key={el.value} label={el.label} value={el.value} />
              ))}
            </Picker>
          )}
          rules={{
            required: {
              value: true,
              message: t('form.require'),
            },
          }}
        />

        <Button dark small onPress={() => setModalVisible(false)}>
          {t('buttons.submit')}
        </Button>
      </Popup>
    </S.FieldContainer>
  );
};

export default SelectField;
