export type SkillName = "attack" |
"defence" |
"strength" |
"hitpoints" |
"ranged" |
"prayer" |
"magic" |
"cooking" |
"woodcutting" |
"fletching" |
"fishing" |
"firemaking" |
"crafting" |
"smithing" |
"mining" |
"herblore" |
"agility" |
"thieving" |
"slayer" |
"farming" |
"runecrafting" |
"hunter" |
"construction";

export enum AttackStyle {
  aggressive = "aggressive",
  accurate = "accurate",
  controlled = "controlled",
  defensive = "defensive",
  rapid = "rapid",
  longrange = "longrange",
}

export enum AttackType {
  Stab = "stab",
  Slash = "slash",
  Crush = "crush",
  Magic = "magic",
  Ranged = "ranged",
  Melee = "melee",
}

export interface EquipmentBonuses {
  "attack_stab": number;
  "attack_slash": number;
  "attack_crush": number;
  "attack_magic": number;
  "attack_ranged": number;
  "defence_stab": number;
  "defence_slash": number;
  "defence_crush": number;
  "defence_magic": number;
  "defence_ranged": number;
  "melee_strength": number;
  "ranged_strength": number;
  "magic_damage": number;
  "prayer": number;
}

export type StyleExperience = "shared" |
"ranged and defence" |
"magic and defence" |
SkillName;

export type ExpReward = {
  skill: SkillName;
  amount: number;
};

export type ItemData = {
  item: number;
  amount: number;
  placeholder?: boolean;
};

export interface TaskReward {
  exp: ExpReward[];
  items: ItemData[];
}

export interface CharacterSkill {
  exp: number;
  level: number;
  boost: number;
}

export interface CharacterSkills {
  attack: CharacterSkill;
  defence: CharacterSkill;
  strength: CharacterSkill;
  hitpoints: CharacterSkill;
  ranged: CharacterSkill;
  prayer: CharacterSkill;
  magic: CharacterSkill;
  cooking: CharacterSkill;
  woodcutting: CharacterSkill;
  fletching: CharacterSkill;
  fishing: CharacterSkill;
  firemaking: CharacterSkill;
  crafting: CharacterSkill;
  smithing: CharacterSkill;
  mining: CharacterSkill;
  herblore: CharacterSkill;
  agility: CharacterSkill;
  thieving: CharacterSkill;
  slayer: CharacterSkill;
  farming: CharacterSkill;
  runecrafting: CharacterSkill;
  hunter: CharacterSkill;
  construction: CharacterSkill;
}

export interface EquipmentSlots {
  head: number;
  body: number;
  legs: number;
  feet: number;
  hands: number;
  cape: number;
  weapon: number;
  shield: number;
  ammo: number;
  ring: number;
  neck: number;
}

export interface MonsterOptions {
  id: number;
  name: string;
}

export enum MonsterAttribute {
  Demon = "demon",
  Dragon = "dragon",
  Fiery = "fiery",
  Kalphite = "kalphite",
  Leafy = "leafy",
  Penance = "penance",
  Shade = "shade",
  Undead = "undead",
  Vampyre = "vampyre",
  Xerician = "xerician"
}

export enum MonsterSlayerMaster {
  Turael = "turael",
  Krystilia = "krystilia",
  Mazchna = "mazchna",
  Vannaka = "vannaka",
  Chaeldar = "chaeldar",
  Konar = "konar",
  Nieve = "nieve",
  Duradel = "duradel"
}

export interface MonsterData {
  members: boolean;
  releaseDate: string | null;
  combatLevel: number;
  hitpoints: number;
  maxHit: number;
  attackType: AttackType[];
  attackSpeed: number;
  aggressive: boolean;
  poisonous: boolean;
  immuneToPoison: boolean;
  immuneToVenom: boolean;
  attributes: MonsterAttribute[];
  category: string[];
  examineText: string;
  wikiName: string;
  wikiURL: string;
  attackLevel: number;
  strengthLevel: number;
  defenceLevel: number;
  magicLevel: number;
  rangedLevel: number;
  attackStab: number;
  attackSlash: number;
  attackCrush: number;
  attackMagic: number;
  attackRanged: number;
  defenceStab: number;
  defenceSlash: number;
  defenceCrush: number;
  defenceMagic: number;
  defenceRanged: number;
  attackAccuracy: number;
  meleeStrength: number;
  rangedStrength: number;
  magicDamage: number;
  isSlayerMonster: boolean;
  slayerLevelRequired: number;
  slayerXP: number;
  assignableSlayerMasters: MonsterSlayerMaster[];
}

export interface EquipmentData {
  "attack_stab": number;
  "attack_slash": number;
  "attack_crush": number;
  "attack_magic": number;
  "attack_ranged": number;
  "defence_stab": number;
  "defence_slash": number;
  "defence_crush": number;
  "defence_magic": number;
  "defence_ranged": number;
  "melee_strength": number;
  "ranged_strength": number;
  "magic_damage": number;
  "prayer": number;
  "slot": EquipmentSlotNames;
  "requirements": EquipableRequirements | null;
}

export enum EquipmentSlotNames {
  head = "head",
  body = "body",
  legs = "legs",
  feet = "feet",
  hands = "hands",
  cape = "cape",
  weapon = "weapon",
  shield = "shield",
  ammo = "ammo",
  ring = "ring",
  neck = "neck"
}

export interface EquipableRequirements {
  attack?: number;
  strength?: number;
  defence?: number;
  ranged?: number;
  magic?: number;
  prayer?: number;
}

export type ItemMap = Map<number, number>;