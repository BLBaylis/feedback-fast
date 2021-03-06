/** @jsx jsx */
import { jsx } from '@emotion/core';
import SvgIcon from '@material-ui/core/SvgIcon';

const Logo = ({ style }) => {
  return (
    <SvgIcon
      viewBox="0 0 176.16 37.511"
      preserveAspectRatio="xMidYMid meet"
      css={style.svg}
    >
      <text
        transform="scale(1.001 .99905)"
        x="106.03111"
        y="25.246887"
        style={{
          fill: '#fff',
          fontFamily: 'sans-serif',
          fontSize: '16.917px',
          fontHeight: 'bold',
          letterSpacing: '0px',
          lineHeight: '1.25',
          strokeWidth: '.39649',
          textAlign: 'center',
          textAnchor: 'middle',
          wordSpacing: '0px'
        }}
      >
        <tspan x="106.03111" y="25.246887" style={{ strokeWidth: '.39649' }}>
          <tspan x="97.503111" y="25.246887" style={{ strokeWidth: '.39649' }}>
            Feedback Fast
          </tspan>
        </tspan>
      </text>
      <g
        transform="translate(-18.968 -12.188)"
        style={{ fill: style.icon.fill, strokeOpacity: 0 }}
      >
        <path d="m26.614 15.742 6.2675 33.957-2.058-22.731 11.132-0.65481v-4.303l4.2095-9.8222-4.0224 6.5481z" />
        <path d="m37.771 34.487-4.5837 15.061 2.8999-13.564-0.56127-8.3254 7.39-0.46772 3.274-14.967-1.7773 20.393z" />
        <path d="m39.267 35.423 6.1739-1.5903v4.0224l-4.116 1.3096-8.1384 10.383 6.2675-9.6351z" />
        <path d="m46.729 30.945 6.2675-0.70158-0.46772 4.9578-5.7062 1.8241z" />
        <path d="m50.837 24.788 3.1337 0.14032-0.70158 4.1627-4.1627 0.37418 0.37418-4.5369-3.2741-12.161z" />
        <path d="m51.989 19.193 3.5079 0.93544-0.46772 3.7418-3.3208-0.42095 0.14032-2.5725-5.6594-8.6528z" />
      </g>
    </SvgIcon>
  );
};

export default Logo;
