import { PropsWithChildren } from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { RadialGradient, Defs, Stop, Rect } from 'react-native-svg';

import Bubble from './Bubble';
import { bubbles } from './bubblesData';
import BackButton from '../components/atoms/BackButton';
import GlobalLoader from '../components/atoms/GlobalLoader';
import { useGlobalProvider } from './GlobalProvider';
import Toast from 'react-native-toast-message';

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  const { isLoading } = useGlobalProvider();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{ position: 'absolute', top: 0, left: 0 }}>
      <View style={{ position: 'relative', top: 0, left: 0 }}>
        <Svg height={`${windowHeight + 100}`} width={`${windowWidth}`}>
          <Defs>
            <RadialGradient
              id='grad'
              cx='50%'
              cy='50%'
              rx='50%'
              ry='50%'
              fx='40%'
              fy='30%'
              gradientUnits='userSpaceOnUse'
            >
              <Stop offset='0%' stopColor='#e5e6ef' stopOpacity='1' />
              <Stop offset='100%' stopColor='#a4a7db' stopOpacity='1' />
            </RadialGradient>
          </Defs>
          <Rect
            x='0'
            y='0'
            width={`${windowWidth}`}
            height={`${windowHeight + 100}`}
            fill='url(#grad)'
            clipPath='url(#clip)'
          />
        </Svg>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        }}
      >
        {bubbles.map((el, i) => (
          <Bubble key={i} {...el} />
        ))}
      </View>
      {children}
      <BackButton />
      {isLoading && <GlobalLoader />}
      <Toast />
    </View>
  );
};

export default Layout;
