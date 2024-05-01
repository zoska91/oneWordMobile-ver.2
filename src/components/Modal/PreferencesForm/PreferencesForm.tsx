import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';

import Button from '../../atoms/Button';
import usePreferencesForm from './usePreferencesForm';
import useGenerateOptionsFields from '../../../helpers/useGenereteOptionsFields';
import { TitleText } from '../../atoms/Title';
import TextWrapper from '../../atoms/TextWrapper';
import SelectField from '../../atoms/SelectInput';
import CheckboxField from '../../atoms/Checkbox';

import * as S from './PreferencesForm.css';
import TimePicker from '../../atoms/TimePicker';

interface PreferencesFormProps {}

const PreferencesForm: FC<PreferencesFormProps> = () => {
  const { t } = useTranslation();

  const { langOptions, daysOptions, learnTypesOptions } = useGenerateOptionsFields();

  const {
    onSubmit,
    isLoading,
    watchSummary,
    watchBreak,
    handleSubmit,
    fields,
    append,
    methods,
    remove,
  } = usePreferencesForm();

  return (
    <KeyboardAwareScrollView>
      {!isLoading && (
        <FormProvider {...methods}>
          <View style={{ paddingBottom: 100 }}>
            <S.Wrapper>
              <TitleText> {t('form.preferencesTitle')}</TitleText>
              <SelectField name='selectLanguage' options={langOptions} required desc />

              <CheckboxField name='isSummary' desc />
              {watchSummary && <SelectField name='summaryDay' options={daysOptions} required />}

              <CheckboxField name='isBreak' desc />
              {watchBreak && <SelectField name='breakDay' options={daysOptions} required />}

              <S.Separator />

              <S.FormLabel>
                <S.SmallTitle style={{ fontFamily: 'JosefinSans_700Bold' }}>
                  {t('form.addDailyNotification')}{' '}
                </S.SmallTitle>
                <AntDesign
                  name='pluscircle'
                  size={24}
                  color='#2e2757'
                  onPress={() => append({ type: 1, time: '00:00', id: fields.length + 1 * 2 })}
                />
              </S.FormLabel>

              <S.Desc>{t('form.itIsTheClue')}</S.Desc>

              {fields.map((item, index) => {
                return (
                  <View key={item.id}>
                    <S.FormLabel>
                      <TextWrapper>{index + 1}. notification</TextWrapper>
                      <AntDesign
                        name='minuscircle'
                        size={24}
                        color='#2e2757'
                        onPress={() => remove(item.id)}
                      />
                    </S.FormLabel>
                    <SelectField
                      name={`notifications.${index}.type`}
                      options={learnTypesOptions}
                      noLabel
                      placeholderText={t('form.notificationSelectPlaceholder')}
                    />
                    <TimePicker name={`notifications.${index}.time`} />
                  </View>
                );
              })}
              {/* problem with scrolling on iOS */}
              <S.Placeholder />
            </S.Wrapper>
            <View style={{ marginBottom: 40 }}>
              <Button secondaryColor onPress={handleSubmit(onSubmit)}>
                {t('buttons.submit')}
              </Button>
            </View>
          </View>
        </FormProvider>
      )}
    </KeyboardAwareScrollView>
  );
};

export default PreferencesForm;
