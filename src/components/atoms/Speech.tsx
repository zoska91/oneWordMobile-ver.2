import { FC } from 'react';
import { Entypo } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { TouchableOpacity } from 'react-native';
import { useGlobalProvider } from '../../layout/GlobalProvider';
import { AvailableLanguages } from '../../types/languages';
import Toast from 'react-native-toast-message';

const SpeechButton: FC = () => {
  const { todayWord, currentLanguage } = useGlobalProvider();
  const readTextAloud = async () => {
    try {
      if (!todayWord) {
        Toast.show({ type: 'info', text2: 'No word to read' });
        return;
      }

      await Speech.speak(todayWord?.transWord, { language: AvailableLanguages[currentLanguage] });
    } catch (error) {
      console.error('Błąd podczas odczytywania tekstu na głos:', error);
    }
  };

  return (
    <TouchableOpacity onPress={readTextAloud}>
      <Entypo name='sound' size={24} color='black' />
    </TouchableOpacity>
  );
};

export default SpeechButton;
