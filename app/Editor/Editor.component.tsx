import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { RangeStatic } from 'quill';
import PopupMenu from './PopupMenu.component';
import { Box } from '@mui/material';
import { base_url } from '@/api/api';
import { promptSlug } from '@/constant/promtp-slug';
import AI_MODELS from '@/interfaces/AI_MODELS';
import { IPromptOptions } from '@/common';
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

interface EditorComponentProps {
    data: string;
}
interface IBounds {
    top: number;
    left: number;
    right: number;
    bottom: number;
    height: number;
    visible: boolean;
}
export enum Action {
    REWRITE = 'Rewrite',
    REPHRASE = 'Rephrase',
}
export default ({ data }: EditorComponentProps) => {
    const { quill, quillRef } = useQuill({
        theme: 'snow',
    });
    const [bounds, setBounds] = useState<IBounds>({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        visible: false,
        height: 0,
    });
    const [open, setOpen] = useState<boolean>(true);
    const [action, setAction] = useState<Action>(Action.REWRITE);
    const [positionToInsertExtraData, setPositionToInsertExtraData] =
        useState<number>(0);
    const [extraData, setExtraData] = useState<string>('');
    const [selectedData, setSelectedData] = useState<string>('');

    const handler = async (
        body: Object,
        url: string = `${base_url}/openaiApi`
    ) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'text/event-stream',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // eslint-disable-next-line no-undef
        let decoder = new TextDecoderStream();
        const reader = response.body.pipeThrough(decoder).getReader();
        let y = '';
        while (true) {
            const { value, done } = await reader.read();
            if (value) {
                console.log('Value: ', value);
                let x: string[] = value.split('data: ');
                let joined = '';

                x.forEach((str) => {
                    joined += str.replace('\n\n', '');
                });
                // setExtraData(() => {
                //     return joined;
                // });
                y += joined;
            }

            if (done) {
                setExtraData(y);
                break;
            }
        }
    };

    const handleClick = async () => {
        let reqBody: IPromptOptions = {};
        switch (action) {
            case Action.REWRITE:
                reqBody.slug = promptSlug.rewrite;
                reqBody.toRewriteText = selectedData; //here we need to pass the selected portion
                reqBody.noOfTitle = undefined;
                break;
            case Action.REPHRASE:
                reqBody.slug = promptSlug.rewrite;
                reqBody.toRewriteText = selectedData; //here we need to pass the selected portion
                reqBody.noOfTitle = undefined;
                break;
        }
        await handler({
            max_token: 200,
            chat: true,
            modelName: AI_MODELS.GPT35_TURBO,
            language: 'English(USA)',
            toneOfVoice: '',
            ...reqBody,
        });
    };
    //TASK:
    //1. When rewrite/rephrase is pressed get the selected part and after the selected part set the values.
    useEffect(() => {
        if (quill) {
            quill.on('selection-change', (data) => {
                if (data) {
                    const selection: RangeStatic = quill?.getSelection();
                    if (selection && selection?.length > 0) {
                        const { top, left, right, bottom, height } =
                            quill.getBounds(selection.index, selection.length);
                        setBounds({
                            top,
                            left,
                            right,
                            bottom,
                            height,
                            visible: true,
                        });
                        setPositionToInsertExtraData(
                            selection.index + selection.length + 1
                        );
                        setSelectedData(
                            quill.getText(selection.index, selection.length)
                        );
                        //DONE: CHECK selection insert
                        // quill.clipboard.dangerouslyPasteHTML(
                        //   selection.index + selection.length + 1,
                        //   "&nbsp;<h2>World</h2>"
                        // );
                    } else {
                        setBounds((prev) => {
                            return {
                                ...prev,
                                visible: false,
                            };
                        });
                    }
                }
            });
        }
    }, [quill]);

    useEffect(() => {
        if (extraData && quill) {
            console.log('Extra data: ', extraData, positionToInsertExtraData);

            quill.clipboard.dangerouslyPasteHTML(
                positionToInsertExtraData,
                extraData
            );
            setPositionToInsertExtraData((prev) => {
                return prev + extraData?.length + 1;
            });
        }
    }, [extraData]);
    useEffect(() => {
        if (data && quill) {
            quill.clipboard.dangerouslyPasteHTML(data ? data : '');
        }
    }, [data]);
    return (
        <>
            <div className="relative z-0" style={{ width: 500, height: 300 }}>
                {bounds.visible && (
                    <div
                        className={`absolute  z-10`}
                        style={{
                            // backgroundColor: "",

                            top: `${Math.floor(bounds.top - 20)}px`,
                            left: `${Math.floor(bounds.left)}px`,
                        }}
                    >
                        {/* <button className="btn">Put the floating menu here!</button> */}
                        <div className="relative">
                            <PopupMenu
                                handleClick={handleClick}
                                setAction={setAction}
                            />
                        </div>
                    </div>
                )}

                <div ref={quillRef} />
            </div>
        </>
    );
};
