import { tagAtom } from '../util/tagAtom';
import { makeRacemic } from '../util/makeRacemic';
import { getOCL } from '../OCL';

import { addDiastereotopicMissingChirality } from './addDiastereotopicMissingChirality';

/**
 * Returns an array of diastereotopic ID (as oclCode)
 * @param {OCL.Molecule} molecule
 * @memberof Dia
 */
export function getDiastereotopicAtomIDs(molecule) {
  const OCL = getOCL();
  addDiastereotopicMissingChirality(molecule);

  let numberAtoms = molecule.getAllAtoms();
  let ids = [];
  for (let iAtom = 0; iAtom < numberAtoms; iAtom++) {
    let tempMolecule = molecule.getCompactCopy();
    tagAtom(tempMolecule, iAtom);
    makeRacemic(tempMolecule);
    // We need to ensure the helper array in order to get correctly the result of racemisation
    ids[iAtom] = tempMolecule.getCanonizedIDCode(
      OCL.Molecule.CANONIZER_ENCODE_ATOM_CUSTOM_LABELS,
    );
  }
  return ids;
}
