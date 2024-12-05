public function getGarages() {
    try {
        $sql = "SELECT id, name, active, createdAt, updatedAt FROM garage";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}

public function getVehicleTypes() {
    try {
        $sql = "SELECT id, describe, active, createdAt, updatedAt FROM vehicle_type";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}

public function getVehicles() {
    try {
        $sql = "SELECT id, describe, vehicle_type_id, size, active, createdAt, updatedAt FROM vehicle";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getVacancies() {
    try {
        $sql = "SELECT garage_id, vehicle_type_id, amount, price, active, createdAt, updatedAt FROM vacancy";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getUserTypes() {
    try {
        $sql = "SELECT id, describe, level, active, createdAt, updatedAt FROM user_type";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getUsers() {
    try {
        $sql = "SELECT id, user_type_id, name, email, active, createdAt, updatedAt FROM user";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getReservations() {
    try {
        $sql = "SELECT id, garage_id, vehicle_id, user_garage_id, checkin, checkout, status, amount, active, createdAt, updatedAt FROM reservation";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getUserVehicles() {
    try {
        $sql = "SELECT id, user_id, vehicle_id, year, color, plate, price, active, createdAt, updatedAt FROM user_vehicle";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getUserGarages() {
    try {
        $sql = "SELECT user_id, garage_id, active, createdAt, updatedAt FROM user_garage";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getReservations() {
    try {
        $sql = "SELECT id, garage_id, vehicle_id, user_garage_id, checkin, checkout, status, amount, active, createdAt, updatedAt FROM reservation";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function getGarageAddresses() {
    try {
        $sql = "SELECT garage_id, cep, state, city, street, number, lat, long, active, createdAt, updatedAt FROM garage_address";
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            echo json_encode($data);
        } else {
            echo json_encode(["message" => "Nenhum dado encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Erro ao buscar dados: " . $e->getMessage()]);
    }
}


public function postVehicle($dados) {
    // Decodifica os dados recebidos
    $data = json_decode($dados);

    // Validação básica para verificar se os dados são válidos
    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Dados inválidos"]);
        exit;
    }

    // Extrai os dados do objeto JSON
    $describe = $data->describe ?? null;
    $vehicle_type_id = $data->vehicle_type_id ?? null;
    $size = $data->size ?? null;
    $active = $data->active ?? true; // Valor padrão
    $createdAt = date('Y-m-d H:i:s'); // Gera a data atual para createdAt
    $updatedAt = date('Y-m-d H:i:s'); // Gera a data atual para updatedAt

    // Verifica se os campos obrigatórios estão presentes
    if (!$describe || !$vehicle_type_id) {
        http_response_code(400);
        echo json_encode(["message" => "Campos obrigatórios não preenchidos"]);
        exit;
    }

    try {
        // Define a consulta SQL para inserir os dados
        $sql = "INSERT INTO vehicle (describe, vehicle_type_id, size, active, createdAt, updatedAt) 
                VALUES (:describe, :vehicle_type_id, :size, :active, :createdAt, :updatedAt)";
        
        // Prepara a execução da consulta
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->bindParam(':describe', $describe);
        $stmt->bindParam(':vehicle_type_id', $vehicle_type_id);
        $stmt->bindParam(':size', $size);
        $stmt->bindParam(':active', $active, PDO::PARAM_BOOL);
        $stmt->bindParam(':createdAt', $createdAt);
        $stmt->bindParam(':updatedAt', $updatedAt);

        // Executa a consulta
        $stmt->execute();

        // Retorna mensagem de sucesso
        echo json_encode(["message" => "Veículo inserido com sucesso"]);
    } catch (PDOException $e) {
        // Retorna mensagem de erro em caso de falha
        http_response_code(500);
        echo json_encode(["message" => "Erro ao inserir veículo: " . $e->getMessage()]);
    }
}


public function postUserVehicle($dados) {
    // Decodifica os dados recebidos
    $data = json_decode($dados);

    // Validação básica para verificar se os dados são válidos
    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Dados inválidos"]);
        exit;
    }

    // Extrai os dados do objeto JSON
    $user_id = $data->user_id ?? null;
    $vehicle_id = $data->vehicle_id ?? null;
    $year = $data->year ?? null;
    $color = $data->color ?? null;
    $plate = $data->plate ?? null;
    $price = $data->price ?? null;
    $active = $data->active ?? true; // Valor padrão
    $createdAt = date('Y-m-d H:i:s'); // Gera a data atual para createdAt
    $updatedAt = date('Y-m-d H:i:s'); // Gera a data atual para updatedAt

    // Verifica se os campos obrigatórios estão presentes
    if (!$user_id || !$vehicle_id || !$plate) {
        http_response_code(400);
        echo json_encode(["message" => "Campos obrigatórios não preenchidos"]);
        exit;
    }

    try {
        // Define a consulta SQL para inserir os dados
        $sql = "INSERT INTO user_vehicle (user_id, vehicle_id, year, color, plate, price, active, createdAt, updatedAt) 
                VALUES (:user_id, :vehicle_id, :year, :color, :plate, :price, :active, :createdAt, :updatedAt)";
        
        // Prepara a execução da consulta
        $stmt = $this->conn->conectar()->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':vehicle_id', $vehicle_id);
        $stmt->bindParam(':year', $year);
        $stmt->bindParam(':color', $color);
        $stmt->bindParam(':plate', $plate);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':active', $active, PDO::PARAM_BOOL);
        $stmt->bindParam(':createdAt', $createdAt);
        $stmt->bindParam(':updatedAt', $updatedAt);

        // Executa a consulta
        $stmt->execute();

        // Retorna mensagem de sucesso
        echo json_encode(["message" => "Veículo do usuário inserido com sucesso"]);
    } catch (PDOException $e) {
        // Retorna mensagem de erro em caso de falha
        http_response_code(500);
        echo json_encode(["message" => "Erro ao inserir veículo do usuário: " . $e->getMessage()]);
    }
}
