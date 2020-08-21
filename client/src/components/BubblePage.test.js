import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

const mockBubbleColors = [
  {
    color: "aliceblue",
      code: {
        hex: '#f0f8ff'
      },
    id: 1
  },
  {
    color: "limegreen", 
      code: {
        hex: '#99ddbc'
      },
    id: 2
  },
  {
    color: "aqua",
      code: {
        hex: '#7fffd4'
      },
    id: 3
  }
];

test("Fetches data and renders the bubbles", () => {
  // Finish this test
  const { rerender, queryAllByTestId } = render(<BubblePage colors={[]}/>);

  let bubbleColors = queryAllByTestId(/bubbles/i);
  expect(bubbleColors).toHaveLength(0);

  rerender(<BubblePage colors={mockBubbleColors} />);

  let secondBubbleColors = queryAllByTestId(/bubbles/i);
  expect(secondBubbleColors).toHaveLength(3)

});
