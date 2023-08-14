import type ConjugationSubgroup from './ConjugationSubgroup';

export default interface ConjugationGroup {
   name: string;
   subgroups: ConjugationSubgroup[];
}