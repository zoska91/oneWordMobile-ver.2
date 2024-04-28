import { useEffect, useState } from 'react';
// @ts-ignore
import AnimatedLoader from 'react-native-animated-loader';

const GlobalLoader = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);

  return (
    <AnimatedLoader
      visible={visible}
      overlayColor='rgba(69, 66, 85, 0.8)'
      animationStyle={{ width: 300, height: 300 }}
      speed={1}
      source={require('../../../assets/loader.json')}
    >
      {/* <Text>Doing something...</Text> */}
    </AnimatedLoader>
  );
};

export default GlobalLoader;
