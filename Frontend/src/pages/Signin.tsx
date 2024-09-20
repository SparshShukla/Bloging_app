import { Auth } from "../components/LoginWindow";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:lg:grid-cols-2">
      <Auth type="signin" />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
