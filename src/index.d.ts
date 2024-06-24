declare module "codeimg_js" {
  interface option {
    container: HTMLElement;
    num?: number;
    width?: number;
    height?: number;
    background?: string;
    fsize?: number[];
    cimgRefresh?: boolean;
    changeBtn?: HTMLElement[];
    iconum?: number;
    fontSize?: number;
  }

  num: 4,
    class CodeImg_JS {
      constructor(option: option);

      private init(option: option): void;

      private picVerificationCode(): void;

      private shuffle(arr: any[]): any[];

      private supportCss3(style: string): boolean;

      private isElement(OBJ: any): boolean;

      private dataType(data: any): boolean;

      private randomNum(minNum: number, maxNum: number): number;

      getData(): [number | string];
    };

  export = CodeImg_JS;
}
