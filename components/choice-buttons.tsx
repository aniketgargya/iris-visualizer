import { FC } from "react";
import { CustomButton } from "./";

interface Choice {
    displayName: string;
    id: string;
};

interface IProps {
    choices: Choice[];
    selectedId?: string;
    setSelectedId: (id: string) => void;
};

const ChoiceButtons: FC<IProps> = ({ choices, selectedId, setSelectedId }) => {
    return (
        <div className="flex flex-wrap ">
            {
                choices.map(({ displayName, id }) => (
                    <CustomButton
                        key={id}
                        onClick={() => { setSelectedId(id) }}
                        selected={selectedId == id}
                        className="mr-2 mb-1 last:mr-0"
                    >
                        {displayName}
                    </CustomButton>
                ))
            }
        </div>
    );
};

export type { Choice };
export default ChoiceButtons;