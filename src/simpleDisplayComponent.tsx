import React, { useState } from "react";
import WordBucketProcessorBuilder from "./domain/wordBucketProcessorBuilder";
import TwoBucketCombinationChecker from "./domain/combinationChecker/twoBucketCombinationChecker";
import inputFile from "./assets/input.txt?raw";
// this component is just for quick testing of the domain logic

const useExternalWordData = () => {
  const processor = WordBucketProcessorBuilder.create()
    .withBucketCollectionOptions({
      onWordAddedToBucket: (word, bucket) => {
        console.log(`${word} added to bucket ${bucket}`);
      },
      maxWordLength: 6,
    })
    .withClearText(inputFile)
    .build();

  return processor;
};

const SimpleDisplayComponent: React.FC = () => {
  const [result, setResult] = useState<Map<string, string[][]>>(new Map());
  const [isProcessing, setIsProcessing] = useState(false);

  const processor = useExternalWordData();

  const processAsync = async () => {
    setIsProcessing(true);
    setResult(new Map());
    setTimeout(async() => {
      
      const collection = await processor.process((line) => {
        console.log(`${line} read`);
      });

      const bucketChecker = new TwoBucketCombinationChecker(collection);
      const combinations = bucketChecker.checkCombinations(
        (result, combination) => {
          console.log(` ${combination.join(" + ")} = ${result}`);
        }
      );

      setIsProcessing(false);
      setResult(combinations);
    }, 0);
  };

  return (
    <>
      <div
        className="p-4 my-4 text-sm  rounded-lg bg-gray-800 text-blue-400"
        role="alert"
      >
        check your console log when pressing the button to see the progress
      </div>
      <button
        disabled={isProcessing}
        className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          processAsync();
        }}
      >
        {isProcessing ? "Processing..." : "Process"}
      </button>

      <hr className="my-4" />
      <div className="flex flex-row gap-4 w-full flex-wrap">
        {Array.from(result.entries()).sort().map(([key, value]) => (
          <div key={key} className="w-1/6">
            <h2 className="font-bold text-xl">{key}</h2>
            <ul className="list-disc pl-4">
              {value.map((combination) => (
                <li key={combination.join("+")}>{combination.join(" + ")}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default SimpleDisplayComponent;
