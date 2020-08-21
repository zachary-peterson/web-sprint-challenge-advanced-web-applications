import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import BubblePage from "./BubblePage";
import { fetchBubbleColors as mockFetchBubbleColors } from '../api/fetchBubbleColors';


jest.mock('../api/fetchBubbleColors');
console.log(mockFetchBubbleColors);

const mockBubbleColors = {
  config: {},
  data: [
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
]};

test("Fetches data and renders the bubbles", async () => {

  act(() => {
    mockFetchBubbleColors.mockResolvedValueOnce(mockBubbleColors);
  })
  // Finish this test
  const { rerender, queryAllByTestId } = render(<BubblePage colors={[]}/>);

  let bubbleColors = queryAllByTestId(/bubbles/i);
  expect(bubbleColors).toHaveLength(0);

  await rerender(<BubblePage colors={mockBubbleColors} />);

  bubbleColors = queryAllByTestId(/bubbles/i);
  expect(bubbleColors).toHaveLength(3);
});
