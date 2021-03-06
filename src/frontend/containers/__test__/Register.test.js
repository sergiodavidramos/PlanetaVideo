import React from "react";
import { create } from "react-test-renderer";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProviderMock from "../../__mocks__/ProviderMock";
import Register from "../Register";

configure({ adapter: new Adapter() });

describe("Carousel Item Component", () => {
  test("Match Snapshot", () => {
    const register = create(
      <ProviderMock>
        <Register />
      </ProviderMock>
    );
    expect(register.toJSON()).toMatchSnapshot();
  });
  it("Calls and execute preventDefault function onSubmit form", () => {
    const preventDefault = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Register />
      </ProviderMock>
    );
    wrapper.find("form").simulate("submit", { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
