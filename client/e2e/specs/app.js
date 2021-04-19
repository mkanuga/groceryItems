import { load, getTitle } from "../pageObjects/index";

describe("React App", () => {
  beforeEach(async () => {
    await load();
  });

  it("should show the correct intro", async () => {
    expect(await getTitle()).toBe("Grocery Admin");
  });

});
