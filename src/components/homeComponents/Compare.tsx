import { Button } from "../ui/button";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import img1 from "../../assets/compare1.jpg";
import img2 from "../../assets/compare2.jpg";
import { Link } from "react-router-dom";

const Compare = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            MAKE IT YOUR OWN
          </p>
          <h1 className="text-3xl  font-bold">
            Keyboard Accessories
          </h1>
          <p className="text-lg text-muted-foreground">
            Upgrade your setup with the latest in keycaps, cables, wrist rests,
            and more
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-full">
              <Link to={"/products"}>Shop Keyboard Accessories</Link>
            </Button>
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg">
          <ReactCompareSlider
          position={50}
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
