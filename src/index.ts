import getDefinitionGroups from './functions/getDefinitionGroups';
import getPronunciation from './functions/getPronunciation';
import getConjugationGroups from './functions/getConjugationGroups';
import getUsageExamples from './functions/getUsageExamples';
import type DefinitionGroup from './interfaces/DefinitionGroup';
import type Definition from './interfaces/Definition';
import type Pronunciation from './interfaces/Pronunciation';
import type ConjugationGroup from './interfaces/ConjugationGroup';
import type ConjugationSubgroup from './interfaces/ConjugationSubgroup';
import type ConjugationTense from './interfaces/ConjugationTense';
import type UsageExample from './interfaces/UsageExample';
import type UsageExampleSource from './interfaces/UsageExampleSource';

export {
   // Functions
   getDefinitionGroups,
   getPronunciation,
   getConjugationGroups,
   getUsageExamples,

   // Types
   DefinitionGroup,
   Definition,
   Pronunciation,
   ConjugationGroup,
   ConjugationSubgroup,
   ConjugationTense,
   UsageExample,
   UsageExampleSource
}