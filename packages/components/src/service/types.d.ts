// 资产域
export declare namespace AssertService {
  export interface IDept {
    departName: string;
    haveChildren: boolean;
    id: number;
    pid: number;
  }

  export interface ProjectMember {
    email?: string;
    id: number;
    nickname: string;
    phone: string;
    projectMember: boolean;
    userId: number;
    username: string;
    empNo: string;
  }

  export interface IDeptQuery {
    // 父部门
    pid?: number;
    // 用户id
    userId: number;
    // 部门名称
    departName?: string;
  }

  export interface ProjectMemberQuery {
    index: number;
    size: number;
    realName?: string;
    departIds?: number;
    userId: number;
    keyword: string;
  }
  export interface ProductVO {
    categoryId: string;
    color: string;
    createTime: string;
    description: string;
    helpFile: string;
    icon: string;
    id: string;
    productId?: string;
    productName?: string;
    isPrecise: boolean;
    isSubApp: boolean;
    name: string;
    needSelectProject: boolean;
    qrCode: string;
    subscribed: false;
    url: string;
    isSubscribe?: boolean;
  }
  export interface CategoryVO {
    createTime: string;
    icon: string;
    iconColor: string;
    id: string;
    sort: number;
    title: string;
    updateTime: string;
    productList?: ProductVO[];
  }

  export interface ProductResp {
    productCategories: CategoryVO[];
    productVOs: ProductVO[];
  }
}

declare interface DevopsResult<T = any> {
  code: string;
  payload: T;
  success: boolean;
}

declare type DevopsPagerResult<T> = DevopsResult<{
  rows: T[];
  total: number;
}>;

declare interface ServiceConfig {
  token: string;
  host: string;
}
