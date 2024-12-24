export class TOOL{

    Defaule = {
    
        // 笛卡尔积算法
        cartesianProduct:(sets)=> {
            return sets.reduce((acc, currentSet) =>
                acc.flatMap(accItem => currentSet.map(currentItem => [...accItem, currentItem])),
                [[]]
            );
        }
    }

}