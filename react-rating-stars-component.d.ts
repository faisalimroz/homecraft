// react-rating-stars-component.d.ts
declare module 'react-rating-stars-component' {
    import { ComponentType } from 'react';
  
    interface ReactStarsProps {
      count: number;
      value: number;
      size: number;
      isHalf?: boolean;
      edit?: boolean;
      emptyIcon?: JSX.Element;
      halfIcon?: JSX.Element;
      fullIcon?: JSX.Element;
      activeColor?: string;
      onChange?: (newValue: number) => void;
    }
  
    const ReactStars: ComponentType<ReactStarsProps>;
  
    export default ReactStars;
  }
  