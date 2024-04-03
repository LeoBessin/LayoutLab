import {ChangeEvent, useState} from "react";

interface iTag {
    tags: string[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    maxTags: number;
}

export const TagField = ({tags, addTag, removeTag, maxTags}: iTag) => {
    // track the use input

    const [userInput, setUserInput] = useState<string>(" ");

    // Handle input onChange

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    // handle Enter key press

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission or new line creation

            if (
                userInput.trim() !== "" &&
                userInput.length <= 12 &&
                tags.length < maxTags
            ) {
                addTag(userInput);
                setUserInput(""); // Clear the input after adding a tag
            }
        }
    };

    return (
        <div className="flex flex-col w-[300px] md:w-[400px] self-start mx-40">
            <input
                name="keyword_tags"
                type="text"
                placeholder={
                    tags.length < maxTags
                        ? "Add a tag"
                        : `You can only enter max. of ${maxTags} tags`
                }
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent"
                onKeyDown={handleKeyPress}
                onChange={handleInputChange}
                value={userInput}
                disabled={tags.length === maxTags}
            />

            <div className="flex flex-row flex-wrap gap-3 mt-4">
                {tags.map((tag: string, index: number) => (
                    <span
                        key={`${index}-${tag}`}
                        className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-bg-300 text-text-100 mr-2"
                    >
            {tag}
                        <button
                            className="ml-2 hover:bg-bg-300"
                            onClick={() => removeTag(tag)}
                            title={`Remove ${tag}`}
                        >
              &times;
            </button>
          </span>
                ))}
            </div>
        </div>
    );
};