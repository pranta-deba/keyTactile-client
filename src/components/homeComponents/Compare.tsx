import { Button } from "../ui/button";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import img1 from "../../assets/compare1.jpg";
import img2 from "../../assets/compare2.jpg";

const Compare = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 lg:p-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            MAKE IT YOUR OWN
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Keyboard Accessories
          </h1>
          <p className="text-lg text-muted-foreground">
            Upgrade your setup with the latest in keycaps, cables, wrist rests,
            and more
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-full">
              Shop Keyboard Accessories
            </Button>
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={img1}
                srcSet={img1}
                alt="Image one"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={img2}
                srcSet={img2}
                alt="Image two"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Compare;
