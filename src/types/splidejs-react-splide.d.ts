declare module '@splidejs/react-splide' {
    import { ComponentType, ReactNode } from 'react';

    export interface SplideProps {
        options?: SplideOptions;
        className?: string;
        children?: ReactNode; 
    }

    export interface SplideSlideProps {
        className?: string;
        children?: ReactNode;
    }

    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideSlideProps>;

    export interface SplideOptions {
        type?: string;
        autoplay?: boolean;
        gap?: string;
        perPage?: number;
        perMove?: number;
        pagination?: boolean;
    }
}
