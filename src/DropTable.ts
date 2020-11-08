import { rollForOneIn, getRandomInt } from "./util";

import { ItemData } from "./types/types";

interface DropTableOptions {
  limit?: number;
}

interface DropTableItemData {
  item: number | DropTable | DropTableItemData[];
  amount: number | number[];
}

interface SecondaryDropTableItems extends DropTableItemData {
  weight: number;
}

interface OneInXDropTableItems extends DropTableItemData {
  chance: number;
}

export class DropTable {
  alwaysItems: DropTableItemData[];
  secondaryItems: SecondaryDropTableItems[];
  tertiaryItems: OneInXDropTableItems[];
  oneInXItems: OneInXDropTableItems[];
  totalWeight: number;
  limit?: number;

  constructor(options: DropTableOptions = {}) {
    this.alwaysItems = [];
    this.secondaryItems = [];
    this.tertiaryItems = [];
    this.oneInXItems = [];
    this.totalWeight = 0;
    this.limit = options.limit;
  }

  always = (
    item: number | DropTable,
    amount: number | number[] = 1,
  ): this => {
    this.alwaysItems.push({ item, amount });
    return this;
  };

  add = (
    item: number | DropTable | number[][],
    amount: number,
    weight: number,
  ): this => {
    if (Array.isArray(item)) {
      const itemData = item.map(([i, a]) => ({ item: i, amount: a }));

      this.secondaryItems.push({ item: itemData, amount, weight });
    } else {
      this.secondaryItems.push({ item, amount, weight });
    }

    this.totalWeight += weight;

    return this;
  };

  tertiary = (
    item: number,
    amount: number | number[],
    chance: number,
  ): this => {
    this.tertiaryItems.push({ item, amount, chance });
    return this;
  };

  oneInX = (
    item: number,
    amount: number | number[],
    chance: number,
  ): this => {
    this.oneInXItems.push({ item, amount, chance });
    return this;
  };

  generateDrop = (): ItemData[] => {
    const roll = getRandomInt(1, this.limit || this.totalWeight);

    let randomIndex = 0;
    let weightTally = 0;

    for (let index = 0; index < this.secondaryItems.length; index += 1) {
      const item = this.secondaryItems[index];

      weightTally += item.weight;

      if (roll <= weightTally) {
        randomIndex = index;
        break;
      }
    }
    const randomItem = this.secondaryItems[randomIndex];

    let drop: ItemData[] = [];
    // 100% drops
    this.alwaysItems.forEach((item) => {
      drop = drop.concat(this.generateResultItem(item));
    });

    this.tertiaryItems.forEach((item) => {
      const { chance } = item;
      if (rollForOneIn(chance)) {
        drop = drop.concat(this.generateResultItem(item));
      }
    });

    for (let index = 0; index < this.oneInXItems.length; index += 1) {
      const item = this.oneInXItems[index];
      const { chance } = item;
      if (rollForOneIn(chance)) {
        drop = drop.concat(this.generateResultItem(item));
        return drop; // we want to return the drop if we roll it and nothing else
      }
    }

    // if nothing check
    if (randomItem !== undefined) {
      drop = drop.concat(this.generateResultItem(randomItem));
    }
    return drop;
  };

  generateResultItem = (itemData: DropTableItemData): ItemData[] => {
    const { item, amount: a } = itemData;
    const amount = this.determineAmount(a);

    if (item instanceof DropTable) {
      let items: ItemData[] = [];
      for (let index = 0; index < amount; index += 1) {
        items = items.concat(
          item
            .generateDrop()
            .map((singleItem) => this.generateResultItem(singleItem))
            .flat(),
        );
      }

      return items;
    }

    if (Array.isArray(item)) {
      const items: ItemData[] = [];
      item.forEach((singleItem) => {
        items.push(this.generateResultItem(singleItem)[0]);
      });

      return items;
    }
    return [{ item, amount }];
  };

  determineAmount = (amount: number | number[]): number => {
    if (Array.isArray(amount)) {
      const [min, max] = amount;
      return getRandomInt(min, max);
    }
    return amount;
  };
}
