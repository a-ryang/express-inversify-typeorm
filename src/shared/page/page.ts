/**
 * generic pagination response
 */
export class Page<T> {
  totalCount: number;
  currentPage: number;
  totalPage: number;
  items: T[];

  constructor(
    totalCount: number,
    currentPage: number,
    requestItemsPerPage: number,
    items: T[]
  ) {
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.totalPage =
      totalCount === 0 ? 1 : Math.ceil(totalCount / requestItemsPerPage);
    this.items = items;
  }
}

/**
 * no-offset pagination response
 */
export class NoOffSetPage<T> {
  next: number | string;
  items: T[];
  constructor(next: never | string, items: T[]) {
    this.next = next;
    this.items = items;
  }
}
