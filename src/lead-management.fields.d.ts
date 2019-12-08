declare namespace leadManagement.types {
  interface Fields {
    確度: {
      type: "RADIO_BUTTON";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    単価: {
      type: "NUMBER";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    先方担当者: {
      type: "SINGLE_LINE_TEXT";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    製品名: {
      type: "DROP_DOWN";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    ユーザー数: {
      type: "NUMBER";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    部署名: {
      type: "SINGLE_LINE_TEXT";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    メールアドレス: {
      type: "SINGLE_LINE_TEXT";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    TEL: {
      type: "SINGLE_LINE_TEXT";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    FAX: {
      type: "SINGLE_LINE_TEXT";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    会社名: {
      type: "SINGLE_LINE_TEXT";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    見込み時期: {
      type: "DATE";
      value: string;
      disabled?: boolean;
      error?: string;
    };
    小計: {
      type: "CALC";
      value: string;
      error?: string;
    };

    案件担当者名: {
      type: "USER_SELECT";
      value: { code: string; name: string }[];
      disabled?: boolean;
      error?: string;
    };
    活動履歴: {
      type: "SUBTABLE";
      value: {
        id: string;
        value: {
          活動内容: {
            type: "DROP_DOWN";
            value: string;
            disabled?: boolean;
            error?: string;
          };
          メモ: {
            type: "SINGLE_LINE_TEXT";
            value: string;
            disabled?: boolean;
            error?: string;
          };
          活動日: {
            type: "DATE";
            value: string;
            disabled?: boolean;
            error?: string;
          };

          添付ファイル: {
            type: "FILE";
            value: {
              contentType: string;
              fileKey: string;
              name: string;
              size: string;
            }[];
            disabled?: boolean;
            error?: string;
          };
        };
      }[];
    };
  }
  interface SavedFields extends Fields {
    $id: {
      type: "__ID__";
      value: string;
    };
    $revision: {
      type: "__REVISION__";
      value: string;
    };
    更新者: {
      type: "MODIFIER";
      value: { code: string; name: string };
    };
    作成者: {
      type: "CREATOR";
      value: { code: string; name: string };
    };
    レコード番号: {
      type: "RECORD_NUMBER";
      value: string;
      error?: string;
    };
    更新日時: {
      type: "UPDATED_TIME";
      value: string;
      error?: string;
    };
    作成日時: {
      type: "CREATED_TIME";
      value: string;
      error?: string;
    };
  }
}
