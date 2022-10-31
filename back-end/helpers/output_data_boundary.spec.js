import OutputDataBoundary from "./output_data_boundary.js";

describe("outputDataBoundary", () => {
      it("should return an empty object if the setOutput is not called", () => {
            const received = OutputDataBoundary.getOutput();
            expect(received).toEqual({});
      });

    it("should return the output when it's set by setOutput", () => {
        const expected = {life: "sadness"};
        OutputDataBoundary.setOutput(expected);
        const received = OutputDataBoundary.getOutput();
        expect(received.life).toBe("sadness");
    });
});
