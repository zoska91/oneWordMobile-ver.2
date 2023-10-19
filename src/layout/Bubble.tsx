import { DimensionValue } from 'react-native';
import Svg, { Circle, RadialGradient, Defs, Stop } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import { moveAnimation } from './animation.ts';
import { IBubble } from './type.ts';


const Bubble = ({
  colors,
  height,
  width,
  r,
  top,
  left,
  cx,
  cy,
  fx,
  fy,
  rx,
  ry,
  opacity,
  flyParams,
  zIndex,
}: IBubble) => {
  const move = moveAnimation(flyParams);

  return (
    <Animatable.View
      style={{ position: 'absolute', top, left, opacity, zIndex }}
      animation={move}
      iterationCount='infinite'
      duration={flyParams.time * 2 * 1000}
      easing='linear'
    >
      <Svg height={height} width={width}>
        <Defs>
          <RadialGradient
            id='grad'
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fx={fx}
            fy={fy}
            gradientUnits='userSpaceOnUse'
          >
            {colors.map((el, i) => (
              <Stop
                key={`${i}-${el}`}
                offset={`${i / colors.length}`}
                stopColor={el}
                stopOpacity='1'
              />
            ))}
          </RadialGradient>
        </Defs>
        <Circle cx={`${+width / 2}`} cy={`${+height / 2}`} r={r} fill='url(#grad)' />
      </Svg>
    </Animatable.View>
  );
};
export default Bubble;