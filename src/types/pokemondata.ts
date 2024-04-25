export interface Evolution {
    id: number;
    evolved_species_id: number;
    evolution_trigger_id: number;
    trigger_item_id: number | null;
    minimum_level: number | null;
    gender_id: number | null;
    location_id: number | null;
    held_item_id: number | null;
    time_of_day: string | null;
    known_move_id: number | null;
    known_move_type_id: number | null;
    minimum_happiness: number | null;
    minimum_beauty: number | null;
    minimum_affection: number | null;
    relative_physical_stats: number | null;
    party_species_id: number | null;
    party_type_id: number | null;
    trade_species_id: number | null;
    needs_overworld_rain: number;
    turn_upside_down: number;
}

export interface IItem {
    id: number;
    name: string;
    description: string;
    cost: number;
    shard: number | null;
    action: string;
    page: number;
    emote: string | null;
    seperate?: number;
  }

   export interface MoveEffectProse {
    move_effect_id: number;
    local_language_id: number;
    short_effect: string;
    effect: string;
  }
  export interface MoveMetaStatChanges {
    move_id: number;
    stat_id: number;
    change: number;
  }

  export interface IMoveMeta {
    move_id: number;
    meta_category_id: number;
    meta_ailment_id: number;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
  }

  export interface IMoveNames {
    move_id: number;
    local_language_id: number;
    name: string;
  }

  export interface IMove {
    id: number;
    identifier: string;
    generation_id: number;
    type_id: number;
    power: number | null;
    pp: number;
    accuracy: number | null;
    priority: number;
    target_id: number;
    damage_class_id: number;
    effect_id: number;
    effect_chance: number | null;
    contest_type_id: number | null;
    contest_effect_id: number | null;
    super_contest_effect_id: number | null;
  }

  export interface IPokemonMove {
    pokemon_id: number;
    version_group_id: number;
    move_id: number;
    pokemon_move_method_id: number;
    level: number;
    order: number;
  }

 /* export interface Pokemon {
    id: number;
    dex_number: number;
    region: string;
    slug: string;
    description: string;
    credit: string | null;
    enabled: number;
    catchable: number;
    abundance: number;
    gender_rate: number;
    has_gender_differences: number;
    "name.to": {
      ja: string;
      ja_r: string;
      ja_t: string;
      en: string;
      en2: string | null;
      de: string;
      fr: string;
    };
    type: {
      "0": string;
      "1": string | null;
    };
    mythical: number;
    legendary: number;
    ultra_beast: number;
    event: number;
    height: number;
    weight: number;
    evo: {
      to: number | null;
      from: number | null;
      mega: number | null;
      mega_x: number | null;
      mega_y: number | null;
    };
    base: {
      hp: number;
      atk: number;
      def: number;
      satk: number;
      sdef: number;
      spd: number;
    };
    is_form: number;
    form_item: number | null;
  }
*/
  export interface Pokemon {
    id: string;
    dex_number: string;
    region: string;
    slug: string;
    description: string;
    credit?: string | null;
    enabled?: string;
    catchable: string;
    abundance: string;
    gender_rate: string;
    has_gender_differences: string;
    "name.ja"?: string;
    "name.ja_r"?: string;
    "name.ja_t"?: string;
    "name.en"?: string;
    "name.en2"?: string | null;
    "name.de"?: string;
    "name.fr"?: string;
    "type.0"?: string;
    "type.1"?: string | null;
    mythical: string;
    legendary: string;
    ultra_beast: string;
    event: string;
    height: string;
    weight: string;
    "evo.to": string | null;
    "evo.from": string | null;
    "base.hp": string;
    "base.atk": string;
    "base.def": string;
    "base.satk": string;
    "base.sdef": string;
    "base.spd": string;
    "evo.mega": string | null;
    "evo.mega_x": string | null;
    "evo.mega_y": string | null;
    is_form: string;
    form_item: string | null;
  }
