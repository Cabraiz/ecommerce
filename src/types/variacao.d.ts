export interface TamanhoDTO {
    tamanho: string;
    estoque: number;
  }
  
  export interface VariacaoComTamanhosDTO {
    id: number;
    cor: string;
    produtoId: number;
    tamanhos: TamanhoDTO[];
  }
  