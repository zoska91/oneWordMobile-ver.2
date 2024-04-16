import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { generateBoxShadowStyle } from '../../helpers/generateBoxShadowStyle';

import * as S from './Inputs.css';
import { Platform, Text } from 'react-native';

interface IProps {
  name: string;
}

const TimePicker: React.FC<IProps> = ({ name }) => {
  const { control } = useFormContext();
  const [showPicker, setShowPicker] = useState(false);

  const hideDatePicker = () => setShowPicker(false);

  return (
    <S.FieldContainer>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const [h, min] = value.split(':');
          const dateValue = new Date();
          dateValue.setHours(h);
          dateValue.setMinutes(min);

          return (
            <S.TimePickerWrapper
              onPress={() => setShowPicker(true)}
              style={{ ...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
            >
              <Text>{value}</Text>
              {showPicker && (
                <DateTimePickerModal
                  isVisible={showPicker}
                  mode='time'
                  onConfirm={(date: Date) => {
                    const time = `${date?.getHours()}:${date?.getMinutes()}`;
                    onChange(date ? time : value);
                    hideDatePicker();
                  }}
                  onCancel={hideDatePicker}
                />
              )}
            </S.TimePickerWrapper>
          );
        }}
      />
    </S.FieldContainer>
  );
};

export default TimePicker;
