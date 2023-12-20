import { AI_MODELS } from '@/constant';

export interface IPromptOptions {
    slug?: string;
    max_token?: number;
    modelName?: AI_MODELS;
    chat?: boolean;
    userDescription?: string;
    language?: string;
    keyPoints?: string;
    introStyle?: string;
    keywords?: string;
    noOfTitle?: number;
    toneOfVoice?: string;
    toRewriteText?: string;
}
