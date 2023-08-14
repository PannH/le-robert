import type ConjugationTense from './ConjugationTense';

export default interface ConjugationSubgroup {
   name: string;
   tenses: ConjugationTense[];
}